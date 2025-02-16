import React from 'react';
import { Carousel } from '@umbra/ui';
import { useGetMovieTopRated } from '../hooks/use-get-movie-top-rated';
import { MovieItem } from './movie-item';
import { useModal } from '../../../components/modal-provider';
import { MovieDetailModal } from './movie-detail-modal';

const MovieRateList = () => {
  const { data } = useGetMovieTopRated();

  const movieDetailModal = useModal();
  const handleMovieItemClick = ({ movieId }: { movieId: number }) => {
    movieDetailModal.open(({ isOpen, close }) => (
      <MovieDetailModal movieId={movieId} isOpen={isOpen} closeModal={close} />
    ));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-xl font-bold">Movie Top Rate</div>
      <Carousel>
        {data.results.map((item) => (
          <div key={item.id} className="pr-5 w-full h-full">
            <MovieItem
              imageUrl={item.backdropPath}
              onClick={() => {
                handleMovieItemClick({ movieId: item.id });
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export { MovieRateList };
