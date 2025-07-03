
import React from 'react';

interface LandingPageProps {
  onNavigate: () => void;
}

const DeskBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#2c1e10]">
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                <filter id="woodGrain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.8" numOctaves="4" seed="10" result="turbulence" />
                    <feColorMatrix in="turbulence" type="saturate" values="0" result="desaturated" />
                    <feComponentTransfer in="desaturated" result="contrast">
                        <feFuncR type="linear" slope="4" intercept="-1.5"/>
                        <feFuncG type="linear" slope="4" intercept="-1.5"/>
                        <feFuncB type="linear" slope="4" intercept="-1.5"/>
                    </feComponentTransfer>
                    <feComposite operator="in" in2="SourceGraphic" result="woodPattern"/>
                    <feBlend in="SourceGraphic" in2="woodPattern" mode="multiply" />
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="#4a3828" />
            <rect width="100%" height="100%" filter="url(#woodGrain)" opacity="0.4" />
        </svg>
        <div 
            className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-orange-300/40 via-orange-400/20 to-transparent"
            style={{ filter: 'blur(100px)' }}
            aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {

  const handleClick = () => {
    console.log("Page turn sound would play here.");
    onNavigate();
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center relative py-12 px-4"
      aria-label="18세기풍의 어둡고 고급스러운 목재 책상 위"
    >
      <DeskBackground />
      <div 
        className="relative z-10 w-[400px] h-[600px] bg-[#3d2c1d] rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer transform hover:scale-105 transition-transform duration-300"
        onClick={handleClick}
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0,0,0,0.6)' }}
      >
        <div className="w-full h-full border-4 border-black/30 rounded-md flex flex-col items-center justify-center text-center">
          <h1 
            className="text-5xl font-serif-elegant mb-2 animate-pulse"
            style={{ color: '#d4af37', textShadow: '1px 1px 5px rgba(0,0,0,0.8)' }}
          >
            프로젝트 제네시스
          </h1>
          <p 
            className="text-xl font-serif-elegant"
            style={{ color: '#d4af37', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
          >
            PROJECT G.E.N.E.S.I.S.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;