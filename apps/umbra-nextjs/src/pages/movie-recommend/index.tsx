import React, { Suspense, useState } from 'react';
import { StepProgressBar } from '@/components/movie-recommand/components/step-progress-bar';
import { FormProvider, useForm } from 'react-hook-form';
import { STEPS, Step } from '@/components/movie-recommand/constants';
import { Genre } from '@/components/movie-recommand/components/genre';
import { Year } from '@/components/movie-recommand/components/year';
import { Rating } from '@/components/movie-recommand/components/rating';
import { useGetMovies } from '@/components/movie-recommand/hooks/use-get-movies';
import { MovieCard } from '@/components/movie-recommand/components/movie-card';

import type { Movie, MovieDiscoverParams, MovieRecommendationForm } from '@/components/movie-recommand/types';
import { StepControlAndSubmitButton } from '@/components/movie-recommand/components/step-control-and-submit-button';
import { ErrorBoundary } from '@/components/movie/components/error-boundary';
import { ErrorFallback } from '@/components/movie/components/error-fallback';

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

  const renderStep = (() => {
    switch (currentStep) {
      case STEPS[Step.GENRE]:
        return (
          <ErrorBoundary fallback={<ErrorFallback onRetry={() => {}} />}>
            <Suspense>
              <Genre />
            </Suspense>
          </ErrorBoundary>
        );
      case STEPS[Step.YEAR]:
        return <Year />;
      case STEPS[Step.RATING]:
        return <Rating />;
      case STEPS[Step.RESULTS]:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {moviesData?.results.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        );
      default:
        return null;
    }
  })();

  const isStepValid = (() => {
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
  })();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">영화 추천</h1>
      <StepProgressBar currentStep={currentStep} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep}
          <StepControlAndSubmitButton
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isStepValid={isStepValid}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default MovieRecommendPage;
