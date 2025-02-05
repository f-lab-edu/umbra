import React from 'react';
import { Carousel } from '@/components/carousel';
import { useGetMovieTopRated } from '@/app/movie/hooks/use-get-movie-top-rated';
import { MovieItem } from '@/app/movie/components/movie-item';
import { useModal } from '@/hooks/use-modal';
import { MovieDetailModalProps } from '@/app/movie/components/movie-detail-modal';
import { ModalsEnum } from '@/store/modal-slice';

const MovieRateList = () => {
  const { data } = useGetMovieTopRated();

  const movieDetailModal = useModal<MovieDetailModalProps>(ModalsEnum.MovieDetail);
  const handleMovieItemClick = ({ movieId }: { movieId: number }) => {
    movieDetailModal.open({
      movieId: movieId,
      closeModal: movieDetailModal.close,
    });
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
