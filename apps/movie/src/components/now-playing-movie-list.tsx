import React from 'react';
import { useGetNowPlayingMovieList } from '@/hooks/use-get-now-playing-movie-list';
import { MovieItem } from './movie-item';
import { useInView } from '@/hooks/use-in-view';

const NowPlayingMovieList = () => {
  const { data, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const { ref } = useInView<HTMLDivElement>(() => {
    fetchNextPage();
  }, {});

  return (
    <>
      {data.pages.map((item) => {
        return <MovieItem id={item.id} key={item.id} imageUrl={item.backdropPath} />;
      })}
      <div ref={ref} className="w-0 h-0" />
    </>
  );
};

export { NowPlayingMovieList };
