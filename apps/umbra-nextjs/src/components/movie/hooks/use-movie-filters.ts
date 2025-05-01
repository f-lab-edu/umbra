import { useQueryStates, parseAsArrayOf, parseAsString, parseAsFloat } from 'nuqs';

function useMovieFilters() {
  return useQueryStates({
    genres: parseAsArrayOf(parseAsFloat).withDefault([]),
    sort_by: parseAsString.withDefault('popularity.desc'),
    vote_average: parseAsString.withDefault('0'),
  });
}

export { useMovieFilters };
