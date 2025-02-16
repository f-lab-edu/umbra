import React from 'react';
import { useGetMovieDetails } from '../hooks/use-get-movie-details';
import { LazyImage } from '../../../components/lazy-image';

const MovieDetailContent = ({ movieId }: { movieId: number }) => {
  const { data } = useGetMovieDetails({ id: movieId });

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-5">
      <LazyImage
        className="w-[300px] h-[400px]"
        alt={'movie'}
        src={`https://image.tmdb.org/t/p/w780/${data.posterPath}`}
      />
      <div className="flex justify-center p-5 text-xl font-bold">{data.originalTitle}</div>
    </div>
  );
};

export { MovieDetailContent };
