import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MovieRecommendationForm } from '../types';

const Rating = () => {
  const { setValue, watch } = useFormContext<MovieRecommendationForm>();
  const selectedRating = watch('rating') ?? 6.0;
  const selectedRuntime = watch('runtime') ?? 60;

  const handleRatingChange = (value: number) => {
    setValue('rating', value);
  };

  const handleRuntimeChange = (value: number) => {
    setValue('runtime', value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">최소 평점</h2>
        <p className="text-gray-600 mb-6">원하시는 최소 평점을 선택해주세요.</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={selectedRating}
              onChange={(e) => handleRatingChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="min-w-[3rem] text-center font-medium">{selectedRating}</span>
          </div>
          {selectedRating === 0 && <p className="text-red-500 text-sm">평점을 선택해주세요</p>}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">최소 러닝타임</h2>
        <p className="text-gray-600 mb-6">원하시는 최소 러닝타임을 선택해주세요.</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="300"
              step="30"
              value={selectedRuntime}
              onChange={(e) => handleRuntimeChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="min-w-[3rem] text-center font-medium">{selectedRuntime}분</span>
          </div>
          {selectedRuntime === 0 && <p className="text-red-500 text-sm">러닝타임을 선택해주세요</p>}
        </div>
      </div>
    </div>
  );
};

export { Rating };
