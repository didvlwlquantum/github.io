
import React, { useEffect } from 'react';

interface Chapter34Scene1Props {
    onNavigate: () => void;
}

const Chapter34Scene1: React.FC<Chapter34Scene1Props> = ({ onNavigate }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onNavigate();
        }, 8000);
        return () => clearTimeout(timer);
    }, [onNavigate]);

    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center bg-[#2c3e50] p-8 cursor-pointer"
            onClick={onNavigate}
        >
            <style>{`
                @keyframes fall {
                    from { transform: translateY(-100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fall-1 { animation: fall 1s ease-out 0.5s both; }
                .animate-fall-2 { animation: fall 1s ease-out 1s both; }
                .animate-fall-3 { animation: fall 1s ease-out 1.5s both; }

                @keyframes sew {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .animate-sew { animation: sew 2s ease-in-out infinite; }
            `}</style>
            <div className="w-full flex-grow flex items-stretch">
                {/* Left Panel */}
                <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-500/50 p-4">
                    <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#e5e7eb" strokeWidth="2">
                            <path d="M10 80 L20 40 L80 40 L90 80 Z" />
                            <path d="M5 85 L95 85" />
                            <circle cx="25" cy="90" r="8" />
                            <circle cx="75" cy="90" r="8" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 grid grid-cols-3 gap-1">
                           <div className="w-4 h-4 bg-gray-300 animate-fall-1"></div>
                           <div className="w-4 h-4 bg-gray-300 animate-fall-2"></div>
                           <div className="w-4 h-4 bg-gray-300 animate-fall-3"></div>
                           <div className="w-4 h-4 bg-gray-300"></div>
                           <div className="w-4 h-4 bg-gray-300"></div>
                           <div className="w-4 h-4 bg-gray-300"></div>
                        </div>
                    </div>
                    <p className="mt-4 text-xl text-center text-gray-200">넘쳐나는 에너지</p>
                </div>
                {/* Right Panel */}
                <div className="w-1/2 flex flex-col items-center justify-center p-4">
                    <div className="w-48 h-48 flex items-center justify-center">
                         <svg viewBox="0 0 100 100" className="w-full h-full animate-sew" fill="none" stroke="#e5e7eb" strokeWidth="2">
                            <path d="M 50,20 L 50,70 L 48,80 L 52,80 L 50,70" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M50 20 L 70 20" />
                            <path d="M50 50 C 30 50, 30 70, 50 70 S 70 90, 90 90" strokeDasharray="4 4" stroke="rgba(229, 231, 235, 0.5)"/>
                         </svg>
                    </div>
                     <p className="mt-4 text-xl text-center text-gray-200">멈춰버린 속도</p>
                </div>
            </div>
            <div className="py-4 mt-8 w-full">
                <p className="text-5xl text-center text-white font-bold font-serif-elegant tracking-wider" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                    제국은 '힘'은 얻었지만, '속도'를 잃었다.
                </p>
            </div>
             <div className="mt-4 text-center text-gray-400 animate-pulse">
                <p>클릭하여 계속하기</p>
            </div>
        </div>
    );
};

export default Chapter34Scene1;