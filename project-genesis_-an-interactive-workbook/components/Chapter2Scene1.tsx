
import React, { useEffect } from 'react';

interface Chapter2Scene1Props {
    onNavigate: () => void;
}

const Chapter2Scene1: React.FC<Chapter2Scene1Props> = ({ onNavigate }) => {
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
            <style>
                {`
                @keyframes torch-move {
                    0% { transform: translateX(50vw); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(-50vw); opacity: 0; }
                }
                @keyframes water-rise {
                    0% { transform: translateY(100%); }
                    50% { transform: translateY(100%); }
                    100% { transform: translateY(0%); }
                }
                @keyframes coal-glitter {
                    0%, 100% { opacity: 0; }
                    40% { opacity: 0; }
                    50% { opacity: 1; filter: brightness(1.5); }
                    60% { opacity: 0.5; filter: brightness(1); }
                    70% { opacity: 1; filter: brightness(1.8); }
                    100% { opacity: 0.8; }
                }
                `}
            </style>
            <div className="relative w-[400px] h-[300px] flex items-center justify-center flex-shrink-0">
                {/* Mine Shaft */}
                <div className="absolute w-full h-full bg-black rounded-t-full top-0">
                    <div className="absolute inset-2 bg-[#1a202c] rounded-t-full">
                         {/* Coal Seam */}
                         <div
                            className="absolute top-1/2 left-1/2 w-24 h-16 bg-gray-800 -translate-x-1/2 -translate-y-1/2"
                            style={{ 
                                animation: 'coal-glitter 8s ease-in-out forwards',
                                clipPath: 'polygon(0% 20%, 60% 0%, 100% 40%, 80% 100%, 20% 90%)'
                             }}
                         ></div>
                    </div>
                </div>

                {/* Rising Water */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-blue-400/30 backdrop-blur-sm" style={{ animation: 'water-rise 8s linear forwards' }}></div>

                {/* Torch */}
                <div className="absolute top-1/2 -translate-y-1/2" style={{ animation: 'torch-move 8s linear forwards' }}>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full" style={{
                        boxShadow: '0 0 20px 10px #fef08a, 0 0 40px 20px #fde047, 0 0 80px 40px #eab308'
                    }}></div>
                </div>
            </div>

            <div className="bg-black/50 p-4 rounded-md mt-12">
              <p className="text-2xl text-center text-gray-200 font-sans leading-relaxed">
                  석탄을 발견했지만, 정체불명의 물이 솟구쳐 탄광을 집어삼키고 있다. 희망이 절망으로 바뀌는 순간이다.
              </p>
            </div>
            <div className="mt-4 text-center text-gray-400 animate-pulse">
              <p>클릭하여 계속하기</p>
            </div>
        </div>
    );
};

export default Chapter2Scene1;