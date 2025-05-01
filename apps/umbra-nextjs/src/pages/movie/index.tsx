import { Suspense } from 'react';
import { MovieList } from '@/components/movie/components/now-playing-movie-list';
import { ErrorBoundary } from '@/components/movie/components/error-boundary';
import { ErrorFallback } from '@/components/movie/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';
import { MovieRateList } from '@/components/movie/components/movie-rate-list';

const MoviePage = () => {
  const queryClient = useQueryClient();

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
      <ErrorBoundary fallback={<ErrorFallback onRetry={() => {}} />}>
        <Suspense fallback={<div>로딩중</div>}>
          <MovieList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default MoviePage;
