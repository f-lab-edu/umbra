import React from 'react';
import type { Movie } from '../types';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const posterPath = movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : '/images/no-poster.png';

  const releaseDate = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '개봉일 미정';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[2/3]">
        <img src={posterPath} alt={movie.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span>{releaseDate}</span>
          <span>•</span>
          <span>{movie.voteAverage.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export { MovieCard };
