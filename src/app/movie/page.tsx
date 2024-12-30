import React from 'react';
import { MovieItem } from '@/app/movie/components/movie-item';

const MoviePage = () => {
  return (
    <div className="flex flex-col px-10 py-6">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-1">
        {/* TODO: 임시 UI 확인용 */}
        {Array(20)
          .fill(0)
          .map((_, i) => {
            return <MovieItem key={i} />;
          })}
      </div>
    </div>
  );
};

export default MoviePage;
