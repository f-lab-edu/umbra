import React, { Suspense } from 'react';
import { NowPlayingMovieList } from '@/app/movie/components/now-playing-movie-list';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorFallback } from '@/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';
import { MovieRateList } from '@/app/movie/components/movie-rate-list';

const MoviePage = () => {
  const queryClient = useQueryClient();

  const handleNowPlayingMovieErrorRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['nowPlayingMovieList'], refetchType: 'all' });
  };

  const handleMovieTopRateErrorRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['getMovieTopRated'], refetchType: 'all' });
  };

  return (
    <div className="flex flex-col px-10 py-6">
      <div className="h-[300px] mb-10">
        <ErrorBoundary fallback={<ErrorFallback onRetry={handleMovieTopRateErrorRetry} />}>
          <Suspense fallback={<div>로딩중</div>}>
            <MovieRateList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="text-xl font-bold mb-5">Movie Now Playing</div>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-1">
        <ErrorBoundary fallback={<ErrorFallback onRetry={handleNowPlayingMovieErrorRetry} />}>
          <Suspense fallback={<div>로딩중</div>}>
            <NowPlayingMovieList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MoviePage;
