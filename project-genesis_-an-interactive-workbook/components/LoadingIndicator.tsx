
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black/80">
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          display: inline-block;
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
      `}</style>
      <div className="spinner"></div>
      <p className="text-white text-lg mt-6 font-serif-elegant">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
