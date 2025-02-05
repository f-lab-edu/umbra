import React from 'react';
import { useGetNowPlayingMovieList } from '@/app/movie/hooks/use-get-now-playing-movie-list';
import { MovieItem } from '@/app/movie/components/movie-item';
import { useInView } from '@/hooks/use-in-view';
import { useModal } from '@/hooks/use-modal';
import { ModalsEnum } from '@/store/modal-slice';
import { MovieDetailModalProps } from '@/app/movie/components/movie-detail-modal';

const NowPlayingMovieList = () => {
  const { data, error, isFetching, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const { ref } = useInView<HTMLDivElement>(() => {
    fetchNextPage();
  }, {});
  const movieDetailModal = useModal<MovieDetailModalProps>(ModalsEnum.MovieDetail);

  const handleMovieItemClick = ({ movieId }: { movieId: number }) => {
    movieDetailModal.open({
      movieId: movieId,
      closeModal: movieDetailModal.close,
    });
  };

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {data.pages.map((item) => {
        return (
          <MovieItem
            key={item.id}
            imageUrl={item.backdrop_path}
            onClick={() => {
              handleMovieItemClick({ movieId: item.id });
            }}
          />
        );
      })}
      <div ref={ref} className="w-0 h-0" />
    </>
  );
};

export { NowPlayingMovieList };
