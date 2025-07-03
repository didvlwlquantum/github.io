
import React, { useState, useEffect } from 'react';
import { Decision } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface Chapter1DecisionProps {
  onDecide: (data: Decision) => void;
  isLoading: boolean;
}

const ColdRoomBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
            <defs>
                <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2d3748" />
                    <stop offset="100%" stopColor="#1a202c" />
                </linearGradient>
                <filter id="frost">
                    <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#wallGradient)" />
            <rect x="0" y="0" width="100%" height="100%" fill="black" opacity="0.3" />
        </svg>
    </div>
);


const Chapter1Decision: React.FC<Chapter1DecisionProps> = ({ onDecide, isLoading }) => {
  const [choice, setChoice] = useState<'A' | 'B' | ''>('');
  const [reasoning, setReasoning] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasAllKeywords, setHasAllKeywords] = useState(false);

  const keywords = ['생물자원', '생물다양성'];

  useEffect(() => {
    const hasChoice = choice !== '';
    const allKeywordsFound = keywords.every(kw => reasoning.includes(kw));
    setHasAllKeywords(allKeywordsFound);
    setIsButtonEnabled(hasChoice && allKeywordsFound);
  }, [choice, reasoning]);

  const handleSubmit = () => {
    if (!isButtonEnabled || isLoading) return;

    const foundKeywords = keywords.filter(kw => reasoning.includes(kw));

    const decisionData: Decision = {
      chapterId: "Chapter_1_Resources",
      selectedChoice: choice,
      reasoningText: reasoning,
      requiredKeywords: keywords,
      keywordsFound: foundKeywords,
    };
    onDecide(decisionData);
  };

  if (isLoading) {
    return <LoadingIndicator message="의사결정자의 보고서를 분석하는 중..." />;
  }

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-start md:justify-center px-4 md:px-8 py-12 relative"
    >
      <ColdRoomBackground />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-4xl bg-black/70 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-2xl border border-gray-600">
        <p className="text-xl text-center text-gray-200 mb-6 font-serif-elegant">
          혹한으로 국민들이 얼어 죽고, 제국 전체가 멈춰 설 위기입니다. 당신은 제국의 에너지 정책을 결정해야 합니다.
        </p>

        <h2 className="text-2xl text-center font-bold text-white mb-4">[명령을 선택하시오]</h2>

        <div className="space-y-4 mb-8">
          <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'A' ? 'bg-blue-900/70 border-blue-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
            <input type="radio" name="decision" value="A" onChange={() => setChoice('A')} className="hidden" />
            <div className="flex items-center">
              <span className="font-bold text-blue-400 text-lg mr-3">A. 통제:</span>
              <span className="text-gray-100">"모든 목재를 국가가 관리한다! 개인 난방을 금지하고, 배급제로 전환하라!"</span>
              {choice === 'A' && <span className="ml-auto text-blue-400">✔</span>}
            </div>
          </label>
          <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'B' ? 'bg-amber-900/70 border-amber-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
            <input type="radio" name="decision" value="B" onChange={() => setChoice('B')} className="hidden" />
            <div className="flex items-center">
              <span className="font-bold text-amber-400 text-lg mr-3">B. 탐사:</span>
              <span className="text-gray-100">"땅속 깊은 곳에 있다는 미지의 '검은 돌(석탄)'을 캐낼 탐사대를 조직하라!"</span>
              {choice === 'B' && <span className="ml-auto text-amber-400">✔</span>}
            </div>
          </label>
        </div>

        <div className="bg-gray-900/70 border border-yellow-600/50 p-4 rounded-md mb-8">
          <h3 className="font-mono text-yellow-400 border-b border-yellow-600/50 pb-2 mb-2">[CODE NAME: DIVERSITY]</h3>
          <p className="text-gray-300 mb-2">이 위기를 해결하려면 다음 두 가지 암호(개념)에 대한 이해가 필요하다.</p>
          <code className="text-yellow-300 mr-4">#생물자원</code>
          <code className="text-yellow-300">#생물다양성</code>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">[결정의 근거를 보고하라]</h2>
        <p className="text-sm text-gray-400 mb-4">위의 <strong>'코드명' 두 가지를 모두 사용</strong>하여, 선택한 방안(A 또는 B)이 어떻게 제국의 위기를 극복할 수 있는지, 그 논리적 근거를 서술하십시오.</p>
        
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          placeholder="예: 저는 B를 선택합니다. 왜냐하면 현재의 [생물자원]은 한계에 도달했으므로, 새로운 자원을 확보하는 것이 [생물다양성]을 보존하고..."
          className="w-full h-32 p-3 bg-gray-900/80 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          aria-label="결정의 근거를 입력하는 곳"
        ></textarea>
        
        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled}
          className="w-full mt-6 py-3 px-6 text-lg font-bold rounded-lg transition-all duration-300 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-700 hover:bg-green-600 text-white"
        >
          [보고서 제출하기]
        </button>
        {!isButtonEnabled && (
            <p className="text-center text-xs text-red-400 mt-2">
                {choice === '' ? '먼저 A 또는 B를 선택해주세요. ' : ''}
                {!hasAllKeywords ? '보고서에 필수 키워드 2개를 모두 포함해야 합니다.' : ''}
            </p>
        )}
      </div>
    </div>
  );
};

export default Chapter1Decision;
