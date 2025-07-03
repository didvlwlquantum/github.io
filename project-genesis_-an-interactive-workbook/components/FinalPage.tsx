import React, { useState, useEffect } from 'react';

const textSequence = [
  "이제 마지막 질문이 남았습니다.",
  "이 모든 기적을 관통하는 하나의 언어,",
  "이 세계의 법칙을 서술한 '설계도'의 이름은 무엇이었을까?",
];

const FinalPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [showFinal, setShowFinal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        if (submitted) return;

        if (step < textSequence.length) {
            const timerId = setTimeout(() => {
                setStep(s => s + 1);
            }, 3000); // Display each question for 3 seconds
            return () => clearTimeout(timerId);
        } else if (!showFinal) {
            const timerId = setTimeout(() => {
                setShowFinal(true);
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [step, showFinal, submitted]);
    
    const handleSubmit = () => {
        console.log(`Final answer submitted: ${answer}`);
        console.log("Workbook submitted. The student is ready for the session with their tutor.");
        setSubmitted(true);
    };

    return (
        <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center font-mono p-8 text-white">
            <style>{`
                @keyframes blink { 
                    50% { opacity: 0; }
                }
                .cursor-blink {
                    animation: blink 1s step-end infinite;
                }
                .animate-fadeIn {
                    animation: fadeInAnimation 1s ease-in both;
                }
                @keyframes fadeInAnimation {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            
            <div className="text-center w-full max-w-4xl">
                {!showFinal && step < textSequence.length && (
                    <p key={step} className="text-3xl text-gray-300 animate-fadeIn">
                        {textSequence[step]}
                        {step === textSequence.length -1 && <span className="cursor-blink inline-block">_</span>}
                    </p>
                )}

                {showFinal && !submitted && (
                    <div className="animate-fadeIn">
                        <h1 className="text-4xl text-cyan-400 mb-8 font-serif-elegant">[최종 보고서]</h1>
                        <p className="text-xl mb-6 text-gray-300">{textSequence[2]}</p>
                        <input 
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="답을 입력하시오..."
                            className="w-full max-w-md text-center bg-gray-900 border-b-2 border-cyan-400 focus:border-cyan-200 text-2xl p-2 focus:outline-none transition-all text-white"
                            aria-label="최종 질문에 대한 답변"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!answer}
                            className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            학습 완료 보고서 제출
                        </button>
                    </div>
                )}

                {submitted && (
                    <div className="animate-fadeIn">
                        <h2 className="text-5xl text-yellow-400 font-serif-elegant mb-4">학습을 완료했습니다!</h2>
                        <p className="text-xl text-gray-300">당신의 여정은 끝났습니다. 이제 튜터와 함께 당신의 선택을 되짚어볼 시간입니다.</p>
                        <p className="text-xl text-gray-300 mt-2">창을 닫아주세요.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinalPage;
