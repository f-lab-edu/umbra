import React, { useState } from 'react';
import { StepProgressBar } from './components/step-progress-bar';
import { FormProvider, useForm } from 'react-hook-form';
import { STEPS, Step } from './constants';
import { Genre } from './components/genre';
import { Year } from './components/year';
import { Rating } from './components/rating';
import { useGetMovies } from './hooks/use-get-movies';
import { MovieCard } from './components/movie-card';

import type { MovieDiscoverParams, MovieRecommendationForm } from './types';

const MovieRecommendPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const methods = useForm<MovieRecommendationForm>({
    defaultValues: {
      genres: [],
      releaseYear: undefined,
      rating: 0,
      runtime: 0,
      language: 'ko-KR',
      sortBy: 'popularity.desc',
    },
  });

  const formData = (() => {
    const formData = methods.watch();

    const params: MovieDiscoverParams = {
      sort_by: formData.sortBy,
      language: formData.language,
      include_adult: false,
    };

    if (formData.genres.length > 0) {
      params.with_genres = formData.genres.join('|');
    }

    if (formData.releaseYear) {
      params.primary_release_year = formData.releaseYear;
    }

    if (formData.rating > 0) {
      params['vote_average.gte'] = formData.rating;
    }

    if (formData.runtime > 0) {
      params['with_runtime.gte'] = formData.runtime;
    }

    return params;
  })();

  const { data: moviesData } = useGetMovies(formData, currentStep);

  const onSubmit = async (data: MovieRecommendationForm) => {
    if (currentStep < STEPS[Step.RESULTS]) {
      const isValid = await methods.trigger();
      if (isValid) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      setCurrentStep(0);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case STEPS[Step.GENRE]:
        return methods.watch('genres').length > 0;
      case STEPS[Step.YEAR]:
        return methods.watch('releaseYear') !== undefined;
      case STEPS[Step.RATING]:
        return methods.watch('rating') !== 0 && methods.watch('runtime') !== 0;
      case STEPS[Step.RESULTS]:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS[Step.GENRE]:
        return <Genre />;
      case STEPS[Step.YEAR]:
        return <Year />;
      case STEPS[Step.RATING]:
        return <Rating />;
      case STEPS[Step.RESULTS]:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {moviesData?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">영화 추천</h1>
      <StepProgressBar currentStep={currentStep} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}
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
              disabled={!isStepValid()}
              className={`px-6 py-2 rounded transition-colors ${
                isStepValid()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === STEPS[Step.RESULTS] ? '다시 시작' : '다음'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { MovieRecommendPage };
