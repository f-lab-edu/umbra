import React, { Suspense } from 'react';
import { NowPlayingMovieList } from '@/app/movie/components/now-playing-movie-list';
import { ErrorBoundary } from '@/components/error-boundary';
import { Carousel } from '@/components/carousel';
import { ErrorFallback } from '@/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';

const MoviePage = () => {
  const queryClient = useQueryClient();

  const handleErrorRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['nowPlayingMovieList'], refetchType: 'all' });
  };

  return (
    <div className="flex flex-col px-10 py-6">
      <div className="h-[200px] mb-10">
        <Carousel>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className=" text-white p-4 rounded-lg pr-4 min-w-[500px] h-full">
              <div className="bg-gray-500 w-full h-full">Top {idx + 1}</div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-1">
        {/* TODO: 에러, 로딩 컴포넌트 임시 사용 */}
        <ErrorBoundary fallback={<ErrorFallback onRetry={handleErrorRetry} />}>
          <Suspense fallback={<div>로딩중</div>}>
            <NowPlayingMovieList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MoviePage;
