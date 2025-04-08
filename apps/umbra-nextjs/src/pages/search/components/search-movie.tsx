import React from 'react';
import { Movie } from '../search-repository';
import { LazyImage } from './lazy-image';

const SearchMovie: React.FC<{ movieList: Movie[] }> = ({ movieList }) => {
  if (movieList.length === 0) {
    return <>검색결과 없음</>;
  }

  return (
    <div className="flex space-x-10 space-y-5 flex-wrap">
      {movieList.map((movie) => (
        <MovieItem key={movie.originalTitle} {...movie} />
      ))}
    </div>
  );
};

const MovieItem: React.FC<Movie> = ({ originalTitle, posterPath }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-hidden w-[200px] h-[200px] rounded-lg">
        <LazyImage alt="영화 이미지" src={`https://image.tmdb.org/t/p/w300/${posterPath}`} />
      </div>
      <div className="mt-5 text-xl font-bold">{originalTitle}</div>
    </div>
  );
};

export { SearchMovie };
