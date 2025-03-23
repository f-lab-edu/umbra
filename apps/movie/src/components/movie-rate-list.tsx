import React from 'react';
import { Carousel } from '@zaydenvc/ui';
import { useGetMovieTopRated } from '@/hooks/use-get-movie-top-rated';
import { MovieItem } from './movie-item';

const MovieRateList = () => {
  const { data } = useGetMovieTopRated();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-xl font-bold">Movie Top Rate</div>
      <Carousel>
        {data.results.map((item) => (
          <div key={item.id} className="pr-5 w-full h-full">
            <MovieItem id={item.id} imageUrl={item.backdropPath} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export { MovieRateList };
