import React from 'react';
import { STEPS } from '../constants';

const StepProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {Object.entries(STEPS).map(([key, value]) => (
          <div key={key} className={`flex-1 text-center ${currentStep >= value ? 'text-blue-500' : 'text-gray-400'}`}>
            {key}
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentStep / (Object.keys(STEPS).length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export { StepProgressBar };
