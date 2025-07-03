
import React, { useState, useEffect } from 'react';
import { Decision } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface Chapter34DecisionProps {
  onDecide: (data: Decision) => void;
  isLoading: boolean;
}

const Chapter34Decision: React.FC<Chapter34DecisionProps> = ({ onDecide, isLoading }) => {
  const [choice, setChoice] = useState<'A' | 'B' | ''>('');
  const [reasoning, setReasoning] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasAllKeywords, setHasAllKeywords] = useState(false);

  const keywords = ['힘의작용', '기체의성질'];

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
      chapterId: "Chapter_3_4_Mechanism",
      selectedChoice: choice,
      reasoningText: reasoning,
      requiredKeywords: keywords,
      keywordsFound: foundKeywords,
    };
    onDecide(decisionData);
  };

  if (isLoading) {
    return <LoadingIndicator message="엔지니어링 프로젝트 계획서를 검토하는 중..." />;
  }

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-start md:justify-center px-4 md:px-8 py-12 bg-[#192a56]"
      style={{
        backgroundImage: 'linear-gradient(rgba(25, 42, 86, 0.95), rgba(25, 42, 86, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px)',
        backgroundSize: '100%, 20px 20px, 20px 20px',
      }}
    >
      <div className="w-full max-w-4xl font-mono">
        <div className="flex justify-center mb-8 opacity-70">
            <svg width="200" height="150" viewBox="0 0 200 150" stroke="rgba(255,255,255,0.7)" fill="none" strokeWidth="1">
              {/* Gears */}
              <circle cx="50" cy="50" r="20" />
              <circle cx="90" cy="50" r="20" />
              <path d="M50 50 l25 0 M90 50 l-25 0" />
              {/* Piston */}
              <rect x="120" y="30" width="60" height="40" strokeDasharray="2 2" />
              <rect x="125" y="35" width="20" height="30" fill="rgba(255,255,255,0.1)" />
              <path d="M145 50 H 90" />
              {/* Levers */}
              <path d="M50 70 L 30 100 L 70 100 Z" />
              <path d="M50 70 Q 90 90, 130 90" strokeDasharray="2 2" />
            </svg>
        </div>

        <div className="bg-[#192a56]/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-gray-500">
            <p className="text-xl text-center text-gray-200 mb-6 font-serif-elegant">
              증기기관의 힘을 '생산'과 '운송'에 모두 적용해야 한다. 한정된 예산, 무엇에 집중 투자할 것인가?
            </p>

            <h2 className="text-2xl text-center font-bold text-white mb-4">[엔지니어링 프로젝트를 선택하시오]</h2>

            <div className="space-y-4 mb-8">
              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'A' ? 'bg-purple-900/70 border-purple-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
                <input type="radio" name="decision" value="A" onChange={() => setChoice('A')} className="hidden" />
                 <div className="flex items-center">
                    <strong className="text-purple-400 text-lg mr-3">A. 방직 기계:</strong> <span className="text-gray-100">"증기기관의 힘을 여러 개의 톱니바퀴와 벨트로 연결하여, 수백 개의 바늘을 동시에 움직이는 '자동 방직기'를 개발한다."</span>
                    {choice === 'A' && <span className="ml-auto text-purple-400">✔</span>}
                </div>
              </label>
              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'B' ? 'bg-green-900/70 border-green-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
                <input type="radio" name="decision" value="B" onChange={() => setChoice('B')} className="hidden" />
                 <div className="flex items-center">
                    <strong className="text-green-400 text-lg mr-3">B. 증기 마차:</strong> <span className="text-gray-100">"기체의 압력을 극한으로 높여, 증기기관 자체가 바퀴를 달고 움직이는 '증기 기관차'를 개발한다."</span>
                    {choice === 'B' && <span className="ml-auto text-green-400">✔</span>}
                </div>
              </label>
            </div>

            <div className="bg-gray-900/70 border border-orange-500/50 p-4 rounded-md mb-8">
              <h3 className="font-mono text-orange-400 border-b border-orange-500/50 pb-2 mb-2">[CODE NAME: MECHANISM]</h3>
              <p className="text-gray-300 mb-2">이 위기를 해결하려면 다음 두 가지 암호(개념)에 대한 이해가 필요하다.</p>
              <code className="text-orange-300 mr-4">#힘의작용</code>
              <code className="text-orange-300">#기체의성질</code>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">[결정의 근거를 보고하라]</h2>
            <p className="text-sm text-gray-400 mb-4">위의 <strong>'코드명' 두 가지를 모두 사용</strong>하여, 당신의 선택이 왜 제국의 생산성 또는 운송 문제를 해결할 수 있는지 서술하라.</p>
            
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="예: 저는 A를 선택합니다. 증기기관의 [힘의작용]을 기계에 전달하면... / 예: 저는 B를 선택합니다. [기체의성질]을 이용해 압력을 높이면..."
              className="w-full h-32 p-3 bg-gray-900/80 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition font-mono"
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
    </div>
  );
};

export default Chapter34Decision;
