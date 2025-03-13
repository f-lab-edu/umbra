import React from 'react';

const ErrorFallback = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>에러 발생</div>
      <button onClick={onRetry}>재시도</button>
    </div>
  );
};

export { ErrorFallback };
