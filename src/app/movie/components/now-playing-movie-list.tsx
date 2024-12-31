import React from 'react';
import { useGetNowPlayingMovieList } from '@/app/movie/hooks/use-get-now-playing-movie-list';
import { MovieItem } from '@/app/movie/components/movie-item';
import { useInView } from '@/hooks/use-in-view';

const NowPlayingMovieList = () => {
  const { data, error, isFetching, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const { ref } = useInView<HTMLDivElement>(() => {
    fetchNextPage();
  }, {});

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {data.pages.map((item) => {
        return <MovieItem key={item.id} imageUrl={item.backdrop_path} />;
      })}
      <div ref={ref} className="w-0 h-0" />
    </>
  );
};

export { NowPlayingMovieList };
