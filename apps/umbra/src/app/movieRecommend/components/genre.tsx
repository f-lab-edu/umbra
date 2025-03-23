import React, { useState } from 'react';
import { useGetGenre } from '../hooks/use-get-genre';
import { useFormContext } from 'react-hook-form';
import { MovieRecommendationForm } from '../types';

const Genre = () => {
  const { setValue, watch } = useFormContext<MovieRecommendationForm>();
  const { data: genresData } = useGetGenre();

  const selectedGenres = watch('genres');
  const isAllSelected = selectedGenres.length === genresData?.genres.length;

  const handleGenreChange = (genreId: number) => {
    if (genreId === 0) {
      // 전체 선택/해제 토글
      if (isAllSelected) {
        setValue('genres', []);
      } else {
        setValue('genres', genresData?.genres.map((genre) => genre.id) || []);
      }
    } else {
      // 개별 장르 선택/해제
      setValue(
        'genres',
        selectedGenres.includes(genreId) ? selectedGenres.filter((id) => id !== genreId) : [...selectedGenres, genreId],
      );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">장르 선택</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => handleGenreChange(0)}
          className={`flex items-center justify-center p-3 border rounded transition-colors ${
            isAllSelected
              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="font-medium">전체 {isAllSelected ? '해제' : '선택'}</span>
        </button>
        {genresData?.genres.map((genre) => (
          <label
            key={genre.id}
            className={`flex items-center space-x-2 p-3 border rounded cursor-pointer ${
              isAllSelected
                ? 'opacity-50 cursor-not-allowed'
                : selectedGenres.includes(genre.id)
                  ? 'bg-blue-50 border-blue-500'
                  : 'hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
              disabled={isAllSelected}
              className={`form-checkbox h-5 w-5 text-blue-600 disable:cursor-not-allowed`}
            />
            <span>{genre.name}</span>
          </label>
        ))}
      </div>
      {selectedGenres.length === 0 && <p className="text-red-500 text-sm mt-2">최소 하나의 장르를 선택해주세요.</p>}
    </div>
  );
};

export { Genre };
