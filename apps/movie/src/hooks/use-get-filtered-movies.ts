import { useInfiniteQuery } from '@tanstack/react-query';
import { movieRepository } from '../movie-repository';
import type { FilteredMoviesApiResponse } from '../movie-repository';

const useGetFilteredMovies = (params: { genres?: number[]; sortBy?: string; voteAverage?: string }) => {
  return useInfiniteQuery<FilteredMoviesApiResponse>({
    queryKey: ['filteredMovies', params],
    queryFn: ({ pageParam }) =>
      movieRepository.getFilteredMovies({
        page: pageParam as number,
        genres: params.genres,
        sortBy: params.sortBy,
        voteAverage: params.voteAverage,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
    },
  });
};

export { useGetFilteredMovies };
