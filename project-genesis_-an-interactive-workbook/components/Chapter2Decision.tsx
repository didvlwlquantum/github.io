
import React, { useState, useEffect } from 'react';
import { Decision } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface Chapter2DecisionProps {
  onDecide: (data: Decision) => void;
  isLoading: boolean;
}

const Chapter2Decision: React.FC<Chapter2DecisionProps> = ({ onDecide, isLoading }) => {
  const [choice, setChoice] = useState<'A' | 'B' | ''>('');
  const [reasoning, setReasoning] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasAllKeywords, setHasAllKeywords] = useState(false);

  const keywords = ['열에너지', '상태변화'];

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
      chapterId: "Chapter_2_Kinetic",
      selectedChoice: choice,
      reasoningText: reasoning,
      requiredKeywords: keywords,
      keywordsFound: foundKeywords,
    };
    onDecide(decisionData);
  };

  if (isLoading) {
    return <LoadingIndicator message="새로운 기술 보고서를 분석하는 중..." />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start md:justify-center px-4 md:px-8 py-12 bg-[#2c3e50]">
       <style>{`
        @keyframes rattle {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-3px) rotate(-2deg); }
          75% { transform: translateY(-5px) rotate(3deg); }
        }
        @keyframes steam {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          70% { transform: translateY(-50px) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>
      <div className="relative mb-12 flex-shrink-0">
        {/* Teapot SVG */}
        <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-2xl">
          <path d="M10 70 Q 5 50, 15 40 L 20 20 L 80 20 L 85 40 Q 95 50, 90 70 Z" fill="#c0c0c0"/>
          <path d="M20 70 L 80 70 L 75 80 L 25 80 Z" fill="#a0a0a0" />
          <path d="M 85 40 L 95 35 L 98 45 L 88 50 Z" fill="#c0c0c0" />
          <path d="M40 10 Q 50 0, 60 10 L 55 20 L 45 20 Z" fill="#a0a0a0" style={{animation: 'rattle 0.5s infinite'}} />
          {/* Steam */}
          <circle cx="97" cy="40" r="5" fill="white" style={{animation: 'steam 2s infinite ease-out', animationDelay: '0s'}} />
          <circle cx="97" cy="40" r="4" fill="white" style={{animation: 'steam 2s infinite ease-out', animationDelay: '0.5s'}} />
          <circle cx="97" cy="40" r="6" fill="white" style={{animation: 'steam 2s infinite ease-out', animationDelay: '1s'}} />
        </svg>
        {/* Fire */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-24 h-10 bg-orange-500 rounded-full blur-md"></div>
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-16 h-8 bg-red-600 rounded-full blur-lg"></div>
      </div>
      
      <div className="w-full max-w-4xl bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-gray-600">
        <p className="text-xl text-center text-gray-200 mb-6 font-serif-elegant">
          모두가 절망할 때, 당신은 끓는 주전자 뚜껑에서 기묘한 힘을 발견했다. 이 '힘'의 정체는 무엇이며, 어떻게 활용해야 하는가?
        </p>

        <h2 className="text-2xl text-center font-bold text-white mb-4">[기술 개발 방향을 선택하시오]</h2>

        <div className="space-y-4 mb-8">
          <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'A' ? 'bg-red-900/70 border-red-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
            <input type="radio" name="decision" value="A" onChange={() => setChoice('A')} className="hidden" />
            <div className="flex items-center">
                <strong className="text-red-400 text-lg mr-3">A. 힘의 본질:</strong> <span className="text-gray-100">"저것은 '뜨거운 김' 자체가 가진 신비한 힘이다. 김을 더 많이, 더 뜨겁게 만드는 데 집중하라!"</span>
                {choice === 'A' && <span className="ml-auto text-red-400">✔</span>}
            </div>
          </label>
          <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'B' ? 'bg-sky-900/70 border-sky-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
            <input type="radio" name="decision" value="B" onChange={() => setChoice('B')} className="hidden" />
             <div className="flex items-center">
                <strong className="text-sky-400 text-lg mr-3">B. 입자의 운동:</strong> <span className="text-gray-100">"저것은 보이지 않는 '물의 입자'들이 열을 받아 미쳐 날뛰는 힘이다. 이 입자들의 에너지를 손실 없이 한 곳으로 모으는 장치를 설계하라!"</span>
                {choice === 'B' && <span className="ml-auto text-sky-400">✔</span>}
            </div>
          </label>
        </div>

        <div className="bg-gray-900/70 border border-cyan-500/50 p-4 rounded-md mb-8">
          <h3 className="font-mono text-cyan-400 border-b border-cyan-500/50 pb-2 mb-2">[CODE NAME: KINETIC]</h3>
          <p className="text-gray-300 mb-2">이 위기를 해결하려면 다음 두 가지 암호(개념)에 대한 이해가 필요하다.</p>
          <code className="text-cyan-300 mr-4">#열에너지</code>
          <code className="text-cyan-300">#상태변화</code>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">[결정의 근거를 보고하라]</h2>
        <p className="text-sm text-gray-400 mb-4">위의 <strong>'코드명' 두 가지를 모두 사용</strong>하여, 당신의 선택이 왜 제국을 구할 수 있는지 그 이유를 서술하라.</p>
        
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          placeholder="예: 저는 B를 선택합니다. 왜냐하면 [열에너지]는 입자의 운동을 활발하게 만들고, 액체가 기체로 [상태변화]할 때..."
          className="w-full h-32 p-3 bg-gray-900/80 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
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

export default Chapter2Decision;
