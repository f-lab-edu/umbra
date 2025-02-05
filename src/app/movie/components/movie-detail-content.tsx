import React from 'react';
import { useGetMovieDetails } from '@/app/movie/hooks/use-get-movie-details';

const MovieDetailContent = ({ movieId }: { movieId: number }) => {
  const { data } = useGetMovieDetails({ id: movieId });

  return <></>;
};

export { MovieDetailContent };
