import React, { useEffect, useRef } from 'react';
import { useGetNowPlayingMovieList } from '@/app/movie/hooks/use-get-now-playing-movie-list';
import { MovieItem } from '@/app/movie/components/movie-item';

const NowPlayingMovieList = () => {
  const { data, error, isFetching, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  /**
   * TODO: 무한스크롤 이슈
   *  - 이미지가 로드가 늦게 되기때문에 처음에
   *    인터섹션 옵저버 요소가 먼저 보여지므로
   *    항상 처음 한번은 다음 페이지를 호출하는 문제 발생
   * */
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
