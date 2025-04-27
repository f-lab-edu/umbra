import React from 'react';
import { STEPS } from '../constants';
import { Step } from '../constants';

const StepControlAndSubmitButton: React.FC<{
  currentStep: number;
  setCurrentStep: (value: number | ((prev: number) => number)) => void;
  isStepValid: boolean;
}> = ({ currentStep, setCurrentStep, isStepValid }) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > STEPS[Step.GENRE] && (
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="px-6 py-2 border rounded hover:bg-gray-100"
        >
          이전
        </button>
      )}
      <button
        type="submit"
        disabled={!isStepValid}
        className={`px-6 py-2 rounded transition-colors ${
          isStepValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {currentStep === STEPS[Step.RESULTS] ? '다시 시작' : '다음'}
      </button>
    </div>
  );
};

export { StepControlAndSubmitButton };
