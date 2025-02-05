import React from 'react';
import { useGetMovieDetails } from '@/app/movie/hooks/use-get-movie-details';
import { LazyImage } from '@/components/lazy-image';

const MovieDetailContent = ({ movieId }: { movieId: number }) => {
  const { data } = useGetMovieDetails({ id: movieId });

  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex w-full justify-center ">
        <LazyImage
          className="w-[500px] h-[500px]"
          alt={'movie'}
          src={`https://image.tmdb.org/t/p/w780/${data.posterPath}`}
        />
      </div>
      <div className="flex justify-center p-5 text-xl font-bold">{data.originalTitle}</div>
    </div>
  );
};

export { MovieDetailContent };
