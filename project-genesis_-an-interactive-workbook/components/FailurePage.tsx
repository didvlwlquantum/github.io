
import React from 'react';
import { FailureInfo } from '../types';

interface FailurePageProps {
  info: FailureInfo;
  onRetry: () => void;
}

const FailureBackground: React.FC = () => (
     <div className="absolute inset-0 bg-[#3a1c1c] overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                 <filter id="gloomy">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise"/>
                    <feColorMatrix in="noise" type="matrix" values="0.33 0.33 0.33 0 0, 0.33 0.33 0.33 0 0, 0.33 0.33 0.33 0 0, 0 0 0 1 0" />
                 </filter>
            </defs>
            <rect width="100%" height="100%" fill="#582a2a"/>
            <rect width="100%" height="100%" filter="url(#gloomy)" opacity="0.3" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
);

const FailurePage: React.FC<FailurePageProps> = ({ info, onRetry }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 relative">
        <FailureBackground />
        <div className="relative z-10 w-full max-w-2xl text-center bg-black/60 backdrop-blur-sm p-8 rounded-lg shadow-2xl border-2 border-red-700/80">
            <h1 className="text-4xl font-bold text-red-400 mb-4 font-serif-elegant">
                {info.title}
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {info.reason}
            </p>
            
            <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-md mb-8 text-left">
              <h2 className="font-mono text-red-300 mb-2">[AI 튜터의 분석]</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{info.aiFeedback}</p>
            </div>

            <button
                onClick={onRetry}
                className="bg-yellow-600 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
                [다시 결정하기]
            </button>
        </div>
    </div>
  );
};

export default FailurePage;
