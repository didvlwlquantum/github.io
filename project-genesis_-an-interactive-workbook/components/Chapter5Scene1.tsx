
import React, { useEffect } from 'react';

interface Chapter5Scene1Props {
    onNavigate: () => void;
}

const Chapter5Scene1: React.FC<Chapter5Scene1Props> = ({ onNavigate }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onNavigate();
        }, 8000);
        return () => clearTimeout(timer);
    }, [onNavigate]);

    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-end bg-gradient-to-b from-[#0c2461] to-black p-8 cursor-pointer"
            onClick={onNavigate}
        >
            <style>{`
                @keyframes rotate-ship {
                    from { transform: rotateY(0deg) rotateZ(-2deg) translateX(0px); }
                    to { transform: rotateY(360deg) rotateZ(2deg) translateX(5px); }
                }
                @keyframes fog-drift {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
            `}</style>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                {/* Ship */}
                <div className="w-64 h-64" style={{ animation: 'rotate-ship 20s linear infinite alternate' }}>
                    <svg viewBox="0 0 100 100" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.5)">
                        <path d="M20 80 Q50 60 80 80 L 75 90 L 25 90 Z" />
                        <path d="M48 20 L 52 20 L 52 80 L 48 80 Z" />
                        <path d="M52 25 L 75 40 L 52 45 Z" />
                        <path d="M52 50 L 80 60 L 52 65 Z" />
                    </svg>
                </div>

                {/* Fog */}
                <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ animation: 'fog-drift 15s linear infinite alternate' }}
                ></div>
                 <div 
                    className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent"
                    style={{ animation: 'fog-drift 25s linear infinite alternate-reverse', animationDelay: '5s' }}
                ></div>
            </div>

            <div className="relative w-full bg-gradient-to-t from-black/70 via-black/50 to-transparent pt-12 pb-4">
                 <p className="text-xl text-center text-gray-300 font-serif-elegant px-8 leading-relaxed" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>
                    부는 쌓였지만, 바다로 나간 배들은 돌아오지 않는다. 나침반은 남북만 알려줄 뿐, 동서를 알 수 없어 모두가 길을 잃는다.
                </p>
                 <div className="mt-4 text-center text-gray-400 animate-pulse">
                    <p>클릭하여 계속하기</p>
                </div>
            </div>
        </div>
    );
};

export default Chapter5Scene1;