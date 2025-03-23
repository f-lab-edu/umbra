import React from 'react';
import { useMovieBasicInfo } from '../hooks/use-movie-basic-Info';

export const MovieHero = ({ movieId }: { movieId: string }) => {
  const { data: movieDetail } = useMovieBasicInfo(movieId);

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdropPath})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 h-full flex items-end pb-16">
          <div className="flex gap-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.posterPath}`}
              alt={movieDetail.title}
              className="w-64 rounded-lg shadow-xl"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">{movieDetail.title}</h1>
              <p className="text-lg mb-4">{movieDetail.tagline}</p>
              <div className="flex items-center gap-4 mb-4">
                <span>{new Date(movieDetail.releaseDate).getFullYear()}</span>
                <span>•</span>
                <span>{movieDetail.runtime}분</span>
                <span>•</span>
                <span>{movieDetail.genres.map((genre) => genre.name).join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">TMDb</div>
                <span className="text-xl font-bold">{movieDetail.voteAverage.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
