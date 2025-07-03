
import React, { useState, useEffect } from 'react';

interface IntroPageProps {
  onNavigate: () => void;
}

const ParchmentBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#fdf5e6]">
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                <filter id="parchment" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="2" result="noise"/>
                    <feDiffuseLighting in="noise" lightingColor="#e6d8b8" surfaceScale="2" result="light">
                        <feDistantLight azimuth="45" elevation="60" />
                    </feDiffuseLighting>
                    <feComposite in="light" in2="SourceGraphic" operator="in" result="textured"/>
                </filter>
                <radialGradient id="stain" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="#d4c8a8" stopOpacity="0" />
                    <stop offset="100%" stopColor="#d4c8a8" stopOpacity="0.3" />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="#f3e9d2" />
            <rect width="100%" height="100%" filter="url(#parchment)" opacity="0.4" />
            <rect width="100%" height="100%" fill="url(#stain)" />
        </svg>
    </div>
);

const WaxSeal: React.FC = () => (
    <svg width="128" height="128" viewBox="0 0 100 100">
        <defs>
            <filter id="waxSealEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="turbulence" />
                <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="6" />
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" lightingColor="#ffdddd" result="specular">
                    <fePointLight x="-500" y="-1000" z="2000" />
                </feSpecularLighting>
                <feComposite in="specular" in2="SourceGraphic" operator="in" result="specular"/>
                <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            </filter>
        </defs>
        <circle cx="50" cy="50" r="40" fill="#a40000" filter="url(#waxSealEffect)" />
        {/* Crest: Lion and Crown */}
        <g fill="#c00" stroke="#800" strokeWidth="1">
            {/* Crown */}
            <path d="M35 40 L 65 40 L 60 50 L 40 50 Z" />
            <path d="M35 40 Q 38 35, 45 38" stroke="none" />
            <path d="M45 38 Q 50 33, 55 38" stroke="none" />
            <path d="M55 38 Q 62 35, 65 40" stroke="none" />
            {/* Lion */}
            <path d="M45 52 C 40 60, 45 70, 50 75" stroke="none" />
            <path d="M55 52 C 60 60, 55 70, 50 75" stroke="none" />
            <circle cx="50" cy="55" r="4" stroke="none"/>
        </g>
    </svg>
);

const content = [
    { type: 'bold', text: '[CONFIDENTIAL]' },
    { type: 'normal', text: 'TO: 의사결정자 (The Decision Maker)' },
    { type: 'normal', text: 'FROM: 왕실 비밀 위원회 (The Crown\'s Secret Council)' },
    { type: 'bold', text: 'SUBJECT: 제국의 붕괴 (IMPERIAL COLLAPSE IMMINENT)' },
    { type: 'break', text: '' },
    { type: 'paragraph', text: '귀관을 환영한다, 의사결정자.' },
    { type: 'paragraph', text: '대영제국은 신생국 미국과의 전쟁에서 패했다. 국고는 바닥났고, 국민들은 굶주리고 있다.' },
    { type: 'paragraph', text: '이제부터 당신의 책상에는 5개의 \'위기 보고서\'가 올라올 것이다. 당신의 선택에 제국의 명운이 걸려있다.' },
    { type: 'italic', text: '*정답은 없다. 오직 \'결과\'와 \'책임\'만이 존재할 뿐이다.*' },
];

const LineRenderer: React.FC<{line: {type: string, text: string}}> = ({ line }) => {
    const { type, text } = line;

    const renderMixedText = (text: string) => {
      const match = text.match(/^(\[?[A-Z\s]+:?\]?)(.*)/s);
      if (match) {
        const [_, englishPart, restPart] = match;
        return (
          <>
            <span className="font-mono tracking-wider">{englishPart}</span>
            <span>{restPart}</span>
          </>
        );
      }
      return text;
    };
    
    if (type === 'break') return <hr className="my-6 border-black/20" />;
    
    const textToShow = renderMixedText(text);

    if (type === 'bold') return <p className="font-bold text-lg mb-2">{textToShow}</p>;
    if (type === 'italic') return <p className="italic text-lg my-4">{textToShow}</p>;
    return <p className="text-lg mb-2">{textToShow}</p>;
};


const IntroPage: React.FC<IntroPageProps> = ({ onNavigate }) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsComplete(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative"
        >
            <ParchmentBackground />
            <div className="relative z-10 w-full max-w-4xl text-black font-calligraphy bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-xl">
                <div className="flex justify-center mb-8">
                     <WaxSeal />
                </div>
                
                <div className="min-h-[450px]">
                    {content.map((line, index) => (
                       <div key={index} className="animate-fadeIn">
                         <LineRenderer line={line} />
                       </div>
                    ))}
                </div>

                {isComplete && (
                     <div className="flex justify-center mt-10 animate-fadeIn" style={{animationFillMode: 'forwards', animationDelay: '0.5s'}}>
                        <button
                            onClick={onNavigate}
                            className="bg-red-800/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                        >
                            [첫 번째 보고서 확인하기]
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IntroPage;