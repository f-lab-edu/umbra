import { useGetFilteredMovies } from '../hooks/use-get-filtered-movies';
import { MovieItem } from './movie-item';
import { useInView } from '@/hooks/use-in-view';
import { MovieFilter } from './movie-filter';
import { useMovieFilters } from '@/components/movie/hooks/use-movie-filters';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/movie/components/error-boundary';
import { ErrorFallback } from './error-fallback';
import { Movie } from '@/components/movie-recommand/movie-recommend-repository';

const MovieList = () => {
  const [{ genres, sort_by: sortBy, vote_average: voteAverage }] = useMovieFilters();

  const { data, fetchNextPage } = useGetFilteredMovies({
    genres,
    sortBy,
    voteAverage,
  });

  const { ref } = useInView<HTMLDivElement>(() => {
    fetchNextPage();
  }, {});

  return (
    <div className="flex flex-col">
      <ErrorBoundary fallback={<ErrorFallback onRetry={() => {}} />}>
        <Suspense>
          <MovieFilter />
        </Suspense>
      </ErrorBoundary>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.pages.map((page) =>
          page.results.map((movie, index, array) => (
            <div key={movie.id} className="aspect-[2/3] rounded-lg overflow-hidden">
              <MovieItem id={movie.id} imageUrl={movie.posterPath} />
            </div>
          )),
        )}
      </div>
      <div ref={ref} className="w-0 h-0" />
    </div>
  );
};

export { MovieList };
