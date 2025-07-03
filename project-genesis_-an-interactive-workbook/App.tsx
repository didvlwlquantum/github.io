
import React, { useState, useCallback, useEffect } from 'react';
import { Page, Decision, FailureInfo, AppState, SuccessInfo } from './types';
import LandingPage from './components/LandingPage';
import IntroPage from './components/IntroPage';
import Chapter1Scene1 from './components/Chapter1Scene1';
import Chapter1Decision from './components/Chapter1Decision';
import Chapter2Scene1 from './components/Chapter2Scene1';
import Chapter2Decision from './components/Chapter2Decision';
import Chapter34Scene1 from './components/Chapter34Scene1';
import Chapter34Decision from './components/Chapter34Decision';
import Chapter5Scene1 from './components/Chapter5Scene1';
import Chapter5Decision from './components/Chapter5Decision';
import EpilogueScene1 from './components/EpilogueScene1';
import FinalPage from './components/FinalPage';
import FailurePage from './components/FailurePage';
import SuccessFeedbackPage from './components/SuccessFeedbackPage';
import { getAIFeedback } from './lib/ai';

const APP_STATE_KEY = 'projectGenesisState';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(() => {
        try {
            const savedState = localStorage.getItem(APP_STATE_KEY);
            return savedState ? JSON.parse(savedState) : { currentPage: 'landing', decisions: [] };
        } catch (error) {
            console.error("Could not load saved state:", error);
            return { currentPage: 'landing', decisions: [] };
        }
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [failureInfo, setFailureInfo] = useState<FailureInfo | null>(null);
    const [successInfo, setSuccessInfo] = useState<SuccessInfo | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
        } catch (error) {
            console.error("Could not save state:", error);
        }
    }, [appState]);

    const navigateTo = useCallback((page: Page) => {
        setAppState(prev => ({ ...prev, currentPage: page }));
    }, []);

    const handleDecision = useCallback(async (data: Decision) => {
        setIsLoading(true);

        const aiFeedback = await getAIFeedback(data);

        const newDecisions = [...appState.decisions, data];
        setAppState(prev => ({...prev, decisions: newDecisions}));

        const correctChoices: Record<string, 'A' | 'B'> = {
            "Chapter_1_Resources": 'B',
            "Chapter_2_Kinetic": 'B',
            "Chapter_3_4_Mechanism": 'B',
            "Chapter_5_Celestial": 'B'
        };

        const pageInfo: Record<string, {success: SuccessInfo, failure: FailureInfo}> = {
            "Chapter_1_Resources": {
                success: { title: "보고서가 승인되었습니다.", reason: "새로운 자원을 탐사하여 현재의 위기를 극복하고 미래를 대비하는 당신의 통찰력이 돋보입니다.", aiFeedback, nextPage: 'ch2_scene1' },
                failure: { title: "보고서가 반려되었습니다.", reason: "기존 자원에 대한 통제 강화는 고갈을 가속화할 뿐, 근본적인 해결책이 될 수 없습니다.", aiFeedback, returnTo: 'ch1_decision' }
            },
            "Chapter_2_Kinetic": {
                success: { title: "보고서가 승인되었습니다.", reason: "현상의 본질을 꿰뚫어 보는 과학적 사고방식이야말로 진정한 혁신을 이끌어냅니다.", aiFeedback, nextPage: 'ch34_scene1' },
                failure: { title: "보고서가 반려되었습니다.", reason: "'뜨거운 김'이라는 피상적인 현상을 넘어, 열에너지와 입자의 상태변화라는 근본 원리를 이해해야 합니다.", aiFeedback, returnTo: 'ch2_decision' }
            },
            "Chapter_3_4_Mechanism": {
                 success: { title: "보고서가 승인되었습니다.", reason: "생산성의 혁신을 넘어, 운송의 혁명을 통해 제국 전체의 속도를 바꾸는 당신의 넓은 시야를 신뢰합니다.", aiFeedback, nextPage: 'ch5_scene1' },
                 failure: { title: "보고서가 반려되었습니다.", reason: "생산 속도 개선도 중요하지만, 제국 전체의 병목 현상은 '운송'에 있습니다. 더 큰 문제를 해결해야 합니다.", aiFeedback, returnTo: 'ch34_decision' }
            },
            "Chapter_5_Celestial": {
                 success: { title: "보고서가 승인되었습니다.", reason: "눈앞의 이익이 아닌, 미래를 위한 근본적인 과학 연구에 투자하는 당신의 결단이 제국의 항로를 밝힐 것입니다.", aiFeedback, nextPage: 'epilogue' },
                 failure: { title: "보고서가 반려되었습니다.", reason: "근본 원인을 외면한 채 물량으로 대처하는 것은 제국의 자원을 낭비할 뿐입니다. 더 본질적인 해결책이 필요합니다.", aiFeedback, returnTo: 'ch5_decision' }
            }
        };

        if (correctChoices[data.chapterId] === data.selectedChoice) {
            setSuccessInfo(pageInfo[data.chapterId].success);
            navigateTo('success_feedback');
        } else {
            setFailureInfo(pageInfo[data.chapterId].failure);
            navigateTo('failure');
        }
        setIsLoading(false);
    }, [appState.decisions, navigateTo]);

    const renderPage = () => {
        switch (appState.currentPage) {
            case 'landing': return <LandingPage onNavigate={() => navigateTo('intro')} />;
            case 'intro': return <IntroPage onNavigate={() => navigateTo('ch1_scene1')} />;
            case 'ch1_scene1': return <Chapter1Scene1 onNavigate={() => navigateTo('ch1_decision')} />;
            case 'ch1_decision': return <Chapter1Decision onDecide={handleDecision} isLoading={isLoading} />;
            case 'ch2_scene1': return <Chapter2Scene1 onNavigate={() => navigateTo('ch2_decision')} />;
            case 'ch2_decision': return <Chapter2Decision onDecide={handleDecision} isLoading={isLoading} />;
            case 'ch34_scene1': return <Chapter34Scene1 onNavigate={() => navigateTo('ch34_decision')} />;
            case 'ch34_decision': return <Chapter34Decision onDecide={handleDecision} isLoading={isLoading} />;
            case 'ch5_scene1': return <Chapter5Scene1 onNavigate={() => navigateTo('ch5_decision')} />;
            case 'ch5_decision': return <Chapter5Decision onDecide={handleDecision} isLoading={isLoading} />;
            case 'epilogue': return <EpilogueScene1 onNavigate={() => navigateTo('final')} decisions={appState.decisions} />;
            case 'final': return <FinalPage />;
            case 'failure': return failureInfo && <FailurePage info={failureInfo} onRetry={() => navigateTo(failureInfo.returnTo)} />;
            case 'success_feedback': return successInfo && <SuccessFeedbackPage info={successInfo} onContinue={() => navigateTo(successInfo.nextPage)} />;
            default: return <LandingPage onNavigate={() => navigateTo('intro')} />;
        }
    };

    return (
        <main className="w-full min-h-screen bg-black text-white">
            {renderPage()}
        </main>
    );
};

export default App;
