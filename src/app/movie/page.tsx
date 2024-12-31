import React, { Suspense } from 'react';
import { NowPlayingMovieList } from '@/app/movie/components/now-playing-movie-list';
import { ErrorBoundary } from '@/components/error-boundary';

const MoviePage = () => {
  return (
    <div className="flex flex-col px-10 py-6">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-1">
        {/* TODO: 에러, 로딩 컴포넌트 임시 사용 */}
        <ErrorBoundary fallback={<div>에러</div>}>
          <Suspense fallback={<div>로딩중</div>}>
            <NowPlayingMovieList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MoviePage;
