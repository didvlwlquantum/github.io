
import React, { useEffect } from 'react';

interface Chapter1Scene1Props {
  onNavigate: () => void;
}

type ForestLevel = 'lush' | 'half' | 'desolate';

interface ForestSceneProps {
  level: ForestLevel;
  ariaLabel: string;
}

const ForestScene: React.FC<ForestSceneProps> = ({ level, ariaLabel }) => {
  const treeColor = {
    lush: '#225a38',
    half: '#5a3822',
    desolate: '#524b42',
  };
  const groundColor = {
    lush: '#3c7a4a',
    half: '#8b6b5c',
    desolate: '#6b5a50',
  }
  const skyColor = {
    lush: '#a1d2e6',
    half: '#c4bca9',
    desolate: '#8a8a8a',
  }

  const generateTrees = (count: number, isLush: boolean) => 
    Array.from({ length: count }).map((_, i) => {
        const x = 5 + Math.random() * 90;
        const y = 50 + Math.random() * 40;
        const scale = 0.5 + Math.random() * 0.8;
        return (
            <g key={i} transform={`translate(${x} ${y}) scale(${scale})`}>
                {isLush ? (
                    <polygon points="0,-20 10,0 -10,0" fill={treeColor[level]} />
                ) : (
                    <path d="M0,0 V-15 M-5,-10 L0,-15 L5,-10" stroke={treeColor[level]} strokeWidth="1" fill="none" />
                )}
                <rect x="-2" y="0" width="4" height="10" fill={treeColor[level]} />
            </g>
        )
    });
  
  const generateStumps = (count: number) => 
    Array.from({ length: count }).map((_, i) => {
        const x = 10 + Math.random() * 80;
        const y = 85 + Math.random() * 10;
        return <rect key={i} x={x} y={y} width="5" height="3" fill="#654321" />
    })

  let trees, stumps;
  switch (level) {
    case 'lush':
      trees = generateTrees(40, true);
      stumps = null;
      break;
    case 'half':
      trees = generateTrees(15, true);
      stumps = generateStumps(20);
      break;
    case 'desolate':
      trees = generateTrees(5, false);
      stumps = generateStumps(35);
      break;
  }

  return (
    <div className="h-full w-full bg-gray-800" role="img" aria-label={ariaLabel}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <rect x="0" y="0" width="100" height="100" fill={skyColor[level]} />
            <rect x="0" y="50" width="100" height="50" fill={groundColor[level]} />
            {trees}
            {stumps}
        </svg>
    </div>
  )
}

const Chapter1Scene1: React.FC<Chapter1Scene1Props> = ({ onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div 
      className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 md:p-8 cursor-pointer"
      onClick={onNavigate}
    >
      <div className="grid grid-cols-3 gap-2 w-full max-w-7xl mx-auto flex-grow">
        <ForestScene level="lush" ariaLabel="A lush, dense, green forest." />
        <ForestScene level="half" ariaLabel="The same forest, but with about half the trees cut down, showing stumps." />
        <ForestScene level="desolate" ariaLabel="The same location, now a desolate wasteland with only a few skeletal trees." />
      </div>
      <div className="w-full bg-black/50 p-4 rounded-md mt-8">
        <p className="text-2xl text-center text-gray-200 font-serif-elegant leading-relaxed">
          전쟁과 혹한이 숲을 삼켜버렸습니다. 제국의 유일한 에너지원인 <strong className="text-amber-400">[생물자원]</strong>이 고갈되고 있습니다.
        </p>
      </div>
      <div className="mt-4 text-center text-gray-400 animate-pulse">
        <p>클릭하여 계속하기</p>
      </div>
    </div>
  );
};

export default Chapter1Scene1;