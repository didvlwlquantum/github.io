
import React from 'react';
import { SuccessInfo } from '../types';

interface SuccessFeedbackPageProps {
  info: SuccessInfo;
  onContinue: () => void;
}

const SuccessBackground: React.FC = () => (
     <div className="absolute inset-0 bg-[#1c3a34] overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                 <filter id="aurora">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="5" result="noise"/>
                     <feColorMatrix in="noise" type="matrix" values="
                        0.5 0 0 0 0
                        0 0.8 0 0 0
                        0 0 0.6 0 0
                        0 0 0 0.5 0" />
                 </filter>
            </defs>
            <rect width="100%" height="100%" fill="#2a584a"/>
            <rect width="100%" height="100%" filter="url(#aurora)" opacity="0.4" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    </div>
);

const SuccessFeedbackPage: React.FC<SuccessFeedbackPageProps> = ({ info, onContinue }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 relative">
        <SuccessBackground />
        <div className="relative z-10 w-full max-w-2xl text-center bg-black/60 backdrop-blur-sm p-8 rounded-lg shadow-2xl border-2 border-green-500/80">
            <h1 className="text-4xl font-bold text-green-300 mb-4 font-serif-elegant">
                {info.title}
            </h1>
            <div className="w-24 h-1 bg-green-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {info.reason}
            </p>
            
            <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-md mb-8 text-left">
              <h2 className="font-mono text-green-200 mb-2">[AI 튜터의 분석]</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{info.aiFeedback}</p>
            </div>

            <button
                onClick={onContinue}
                className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
                [다음 보고서 확인하기]
            </button>
        </div>
    </div>
  );
};

export default SuccessFeedbackPage;
