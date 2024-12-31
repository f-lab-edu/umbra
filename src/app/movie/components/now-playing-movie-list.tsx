import React, { useEffect, useRef } from 'react';
import { useGetNowPlayingMovieList } from '@/app/movie/hooks/use-get-now-playing-movie-list';
import { MovieItem } from '@/app/movie/components/movie-item';

const NowPlayingMovieList = () => {
  const { data, error, isFetching, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {data.pages.map((item) => {
        return <MovieItem key={item.id} imageUrl={item.backdrop_path} />;
      })}
      <div ref={observerRef} className="w-0 h-0" />
    </>
  );
};

export { NowPlayingMovieList };
