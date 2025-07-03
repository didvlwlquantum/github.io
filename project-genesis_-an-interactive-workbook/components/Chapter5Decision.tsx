
import React, { useState, useEffect } from 'react';
import { Decision } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface Chapter5DecisionProps {
  onDecide: (data: Decision) => void;
  isLoading: boolean;
}

const Starfield: React.FC = () => {
    const [stars, setStars] = useState<React.CSSProperties[]>([]);
    useEffect(() => {
        const newStars = Array.from({ length: 150 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-black">
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.5; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
            {stars.map((style, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{ ...style, animation: 'twinkle linear infinite' }}
                />
            ))}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
    );
};


const Chapter5Decision: React.FC<Chapter5DecisionProps> = ({ onDecide, isLoading }) => {
  const [choice, setChoice] = useState<'A' | 'B' | ''>('');
  const [reasoning, setReasoning] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasAllKeywords, setHasAllKeywords] = useState(false);

  const keywords = ['지구의자전', '태양계'];

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
      chapterId: "Chapter_5_Celestial",
      selectedChoice: choice,
      reasoningText: reasoning,
      requiredKeywords: keywords,
      keywordsFound: foundKeywords,
    };
    onDecide(decisionData);
  };

  if (isLoading) {
      return <LoadingIndicator message="최종 연구 과제를 분석하는 중..." />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-start md:justify-center px-4 md:px-8 py-12">
      <Starfield />
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex justify-center mb-8">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="1" className="drop-shadow-lg">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="2" fill="#d4af37" />
              <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.5" />
              <path d="M50 50 L 90 30" />
              <g transform="rotate(30 90 30)">
                <path d="M85 30 A 5 5 0 0 1 95 30" />
              </g>
            </svg>
        </div>
        <div className="bg-black/70 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-2xl border border-yellow-600/30">
            <p className="text-xl text-center text-gray-200 mb-6 font-serif-elegant">
              선원들은 저 하늘의 별들이 매일 밤 똑같이 움직인다고 말한다. 이 혼돈 속의 '규칙'을 이용해 길을 찾을 수 있을까?
            </p>
            <h2 className="text-2xl text-center font-bold text-white mb-4">[국가적 연구 과제를 선택하시오]</h2>
            <div className="space-y-4 mb-8">
              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'A' ? 'bg-red-900/70 border-red-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
                <input type="radio" name="decision" value="A" onChange={() => setChoice('A')} className="hidden" />
                 <div className="flex items-center">
                    <strong className="text-red-400 text-lg mr-3">A. 해군력 증강:</strong> <span className="text-gray-100">"길을 잃어도 상관없다. 더 크고 빠른 배를 수백 척 만들어, 그중 일부라도 목적지에 도착하게 하라!"</span>
                    {choice === 'A' && <span className="ml-auto text-red-400">✔</span>}
                </div>
              </label>
              <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${choice === 'B' ? 'bg-indigo-900/70 border-indigo-400' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50'}`}>
                <input type="radio" name="decision" value="B" onChange={() => setChoice('B')} className="hidden" />
                 <div className="flex items-center">
                    <strong className="text-indigo-400 text-lg mr-3">B. 천문학 연구:</strong> <span className="text-gray-100">"당장 돈도 안 되는 밤하늘의 별과 행성의 움직임을 연구하라. 저 거대한 우주의 시계를 해독하여, 바다 위의 좌표를 읽어내라!"</span>
                     {choice === 'B' && <span className="ml-auto text-indigo-400">✔</span>}
                </div>
              </label>
            </div>
            <div className="bg-gray-900/70 border border-purple-500/50 p-4 rounded-md mb-8">
              <h3 className="font-mono text-purple-400 border-b border-purple-500/50 pb-2 mb-2">[CODE NAME: CELESTIAL]</h3>
              <p className="text-gray-300 mb-2">이 위기를 해결하려면 다음 두 가지 암호(개념)에 대한 이해가 필요하다.</p>
              <code className="text-purple-300 mr-4">#지구의자전</code>
              <code className="text-purple-300">#태양계</code>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">[결정의 근거를 보고하라]</h2>
            <p className="text-sm text-gray-400 mb-4">위의 <strong>'코드명' 두 가지를 모두 사용</strong>하여, 당신의 선택이 왜 제국의 해상 문제를 해결할 수 있는지 그 이유를 서술하라.</p>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="예: 저는 B를 선택합니다. 왜냐하면 [지구의자전]은 규칙적이므로, [태양계] 천체의 위치를 기준으로 시간을 계산하면..."
              className="w-full h-32 p-3 bg-gray-900/80 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition font-serif-elegant"
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

export default Chapter5Decision;
