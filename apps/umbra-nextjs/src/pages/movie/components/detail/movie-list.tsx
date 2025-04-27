import { MovieListResponse } from '../../movie-detail-repository';
import Image from 'next/image';

const MovieList: React.FC<{ title: string; movieList: MovieListResponse }> = ({ title, movieList }) => {
  if (movieList.results.length === 0) return null;

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movieList.results.slice(0, 8).map((movie) => (
          <div key={movie.id} className="text-center">
            <div className="aspect-[2/3] mb-2">
              <Image
                src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`}
                alt={movie.title}
                className="w-full h-full object-cover rounded"
                width={342}
                height={513}
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
