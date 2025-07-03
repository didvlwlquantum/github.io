
import React, { useState, useEffect, useMemo } from 'react';
import { Decision } from '../types';

interface EpilogueScene1Props {
  onNavigate: () => void;
  decisions: Decision[];
}

const VictorianLondonPanorama: React.FC = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="80%" stopColor="#FFDAB9" />
                    <stop offset="100%" stopColor="#CD853F" />
                </linearGradient>
                <filter id="haze">
                    <feGaussianBlur stdDeviation="3" />
                </filter>
            </defs>
            {/* Sky */}
            <rect x="0" y="0" width="1200" height="600" fill="url(#skyGradient)" />
            <rect x="0" y="0" width="1200" height="600" fill="white" opacity="0.1" filter="url(#haze)" />

            {/* Distant City/Smokestacks */}
            <g transform="translate(0, 350)">
                <path d="M 0 100 H 1200" fill="#a9a9a9" filter="url(#haze)" />
                <rect x="100" y="0" width="30" height="100" fill="#696969" />
                <circle cx="115" cy="-5" r="15" fill="#d3d3d3" opacity="0.8" />
                <rect x="200" y="-50" width="40" height="150" fill="#696969" />
                <circle cx="220" cy="-55" r="20" fill="#f5f5f5" opacity="0.7" />
                <rect x="900" y="-20" width="25" height="120" fill="#505050" />
                <circle cx="912" cy="-25" r="12" fill="#e0e0e0" opacity="0.9" />
            </g>

            {/* Tower Bridge */}
            <g transform="translate(400, 250)">
                {/* Towers */}
                <path d="M 100 0 V 200 H 150 V 0 Z" fill="#b09a80" />
                <path d="M 250 0 V 200 H 300 V 0 Z" fill="#b09a80" />
                {/* Top Walkways */}
                <rect x="100" y="0" width="200" height="20" fill="#8c7b65" />
                {/* Bridge Deck (simplified) */}
                <rect x="0" y="180" width="400" height="20" fill="#a08a70" />
                <path d="M150 180 C 175 130, 225 130, 250 180" stroke="#a08a70" strokeWidth="5" fill="none" />
            </g>

            {/* River Thames */}
            <rect x="0" y="450" width="1200" height="150" fill="#5F9EA0" />
            <rect x="0" y="450" width="1200" height="150" fill="black" opacity="0.2" />

            {/* Steamships */}
            <g transform="translate(150, 440)">
                <path d="M 0 20 L 150 20 L 140 40 L 10 40 Z" fill="#4a4a4a" />
                <rect x="60" y="-10" width="15" height="40" fill="#333" />
                <circle cx="67" cy="-15" r="10" fill="#ccc" opacity="0.8" />
            </g>
             <g transform="translate(700, 455) scale(0.8)">
                <path d="M 0 20 L 120 20 L 110 35 L 10 35 Z" fill="#5a5a5a" />
                <rect x="50" y="0" width="10" height="30" fill="#333" />
                <circle cx="55" cy="-5" r="8" fill="#eee" opacity="0.7" />
            </g>
        </svg>
    </div>
);


const EpilogueScene1: React.FC<EpilogueScene1Props> = ({ onNavigate, decisions }) => {
    const [step, setStep] = useState(0);

    const fullLog = useMemo(() => [
        '> BOOTING DECISION ARCHIVE...',
        ...(decisions.length > 0 ? decisions.map((d, i) => `> LOG #${i+1}: [CHOICE ${d.selectedChoice}] - ${d.requiredKeywords.join(', ')}`) : ['> NO DECISIONS LOGGED...']),
        '> CALCULATING OUTCOME...'
    ], [decisions]);
    
    const totalSteps = fullLog.length + 6; // log lines + flash + image + 4 text lines

    useEffect(() => {
        if (step > totalSteps) {
            onNavigate();
            return;
        }

        const delay = step < fullLog.length ? 1200 : (step === fullLog.length ? 2500 : 1500);
        
        const sequenceTimer = setTimeout(() => {
            setStep(s => s + 1);
        }, delay);

        // Special case: Navigate away after the last text has been shown for a while.
        if (step === totalSteps) {
             const navTimer = setTimeout(onNavigate, 5000);
             return () => clearTimeout(navTimer);
        }

        return () => clearTimeout(sequenceTimer);
    }, [step, fullLog.length, totalSteps, onNavigate]);
    
    const showFlash = step === fullLog.length + 1;
    const showImage = step > fullLog.length + 1;

    if (!showImage) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center transition-colors duration-500 ${showFlash ? 'bg-white' : 'bg-black'}`}>
                {!showFlash && (
                    <div className="font-mono text-left w-full max-w-4xl p-8">
                        {fullLog.slice(0, step).map((line, index) => (
                            <p key={index} className="text-xl text-cyan-300 animate-fadeIn mb-2">{line}
                            {index === step - 1 && line.includes('CALCULATING') && <span className="inline-block w-3 h-5 bg-cyan-300 ml-2 animate-pulse"></span>}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div 
            className="w-full min-h-screen relative flex items-center justify-center animate-fadeIn"
        >
            <VictorianLondonPanorama />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="relative text-center text-white p-8 z-10">
                 <h1 className={`text-6xl font-serif-elegant font-bold mb-8 transition-opacity duration-1000 ${step >= fullLog.length + 2 ? 'opacity-100' : 'opacity-0'}`} style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
                    당신의 선택이 제국을 구했다.
                </h1>
                <div className="space-y-3">
                    <p className={`text-2xl transition-opacity duration-1000 ${step >= fullLog.length + 3 ? 'opacity-100' : 'opacity-0'}`} style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                        당신은 [생물자원]의 한계를 넘어 [열에너지]와 물질의 [상태변화]에 담긴 비밀을 파헤쳤고,
                    </p>
                    <p className={`text-2xl transition-opacity duration-1000 ${step >= fullLog.length + 4 ? 'opacity-100' : 'opacity-0'}`} style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                        보이지 않는 [힘의 작용]을 제어해 [기체의 성질]을 속도로 바꾸었으며,
                    </p>
                    <p className={`text-2xl transition-opacity duration-1000 ${step >= fullLog.length + 5 ? 'opacity-100' : 'opacity-0'}`} style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                        마침내 [지구의 자전]을 이해하고 [태양계]의 질서를 읽어내 시공간을 정복했습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EpilogueScene1;