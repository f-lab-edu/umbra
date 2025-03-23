import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MovieRecommendationForm } from '../types';

const Year = () => {
  const { setValue, watch } = useFormContext<MovieRecommendationForm>();
  const currentYear = new Date().getFullYear();
  const selectedYear = watch('releaseYear');

  const handleYearChange = (year: number) => {
    setValue('releaseYear', selectedYear === year ? undefined : year);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">어떤 시기의 영화를 찾으시나요?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => handleYearChange(currentYear)}
          className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedYear === currentYear
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-center font-medium">올해</span>
        </button>
        <button
          type="button"
          onClick={() => handleYearChange(currentYear - 1)}
          className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedYear === currentYear - 1
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-center font-medium">작년</span>
        </button>
        <button
          type="button"
          onClick={() => handleYearChange(currentYear - 5)}
          className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedYear === currentYear - 5
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-center font-medium">최근 5년</span>
        </button>
        <button
          type="button"
          onClick={() => handleYearChange(currentYear - 10)}
          className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedYear === currentYear - 10
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-center font-medium">최근 10년</span>
        </button>
      </div>
      {selectedYear === undefined && <p className="text-red-500 text-sm mt-2">시기를 선택해주세요</p>}
    </div>
  );
};

export { Year };
