import React from 'react';
import { useGetNowPlayingMovieList } from '../hooks/use-get-now-playing-movie-list';
import { MovieItem } from './movie-item';
import { useInView } from '../../../hooks/use-in-view';
import { MovieDetailModal } from './movie-detail-modal';
import { useModal } from '../../../components/modal-provider';

const NowPlayingMovieList = () => {
  const { data, fetchNextPage } = useGetNowPlayingMovieList({
    page: 1,
  });

  const { ref } = useInView<HTMLDivElement>(() => {
    fetchNextPage();
  }, {});
  const movieDetailModal = useModal();
  const handleMovieItemClick = ({ movieId }: { movieId: number }) => {
    movieDetailModal.open(({ isOpen, close }) => (
      <MovieDetailModal movieId={movieId} isOpen={isOpen} closeModal={close} />
    ));
  };
  return (
    <>
      {data.pages.map((item) => {
        return (
          <MovieItem
            key={item.id}
            imageUrl={item.backdropPath}
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
