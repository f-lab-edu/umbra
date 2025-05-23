import React from 'react';
import { useMovieRecommendations, useSimilarMovies } from '../hooks/use-movie-recommendations';

const MovieList = ({
  title,
  type,
  movieId,
}: {
  title: string;
  type: 'similar' | 'recommendations';
  movieId: string;
}) => {
  const { data } = type === 'similar' ? useSimilarMovies(movieId) : useMovieRecommendations(movieId);

  if (data.results.length === 0) return null;

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.slice(0, 8).map((movie) => (
          <div key={movie.id} className="text-center">
            <div className="aspect-[2/3] mb-2">
              <img
                src={
                  movie.posterPath
                    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
                    : 'https://via.placeholder.com/342x513'
                }
                alt={movie.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="font-semibold truncate">{movie.title}</h3>
            <p className="text-sm text-gray-600">{new Date(movie.releaseDate).getFullYear()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { MovieList };
