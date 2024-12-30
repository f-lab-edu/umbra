import React from 'react';
import { useGetNowPlayingMovieList } from '@/app/movie/hooks/use-get-now-playing-movie-list';
import { MovieItem } from '@/app/movie/components/movie-item';

const NowPlayingMovieList = () => {
  const { data, error, isFetching } = useGetNowPlayingMovieList({
    page: 1,
  });

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {data.pages.map((item) => {
        return <MovieItem key={item.id} imageUrl={item.backdrop_path} />;
      })}
    </>
  );
};

export { NowPlayingMovieList };
