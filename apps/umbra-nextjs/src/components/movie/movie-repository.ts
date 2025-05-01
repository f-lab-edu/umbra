import { umbraApi } from '@/lib/umbra-api';
import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  originalTitle: string;
  genreIds: number[];
  popularity: number;
}

interface FilteredMoviesApiResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

const movieRepository = {
  getMovieTopRated: async () =>
    umbraApi.get('/movie/top_rated').then(({ data }) => convertSnakeToCamelCase(data.results)),

  getGenres: async (): Promise<Array<{ id: number; name: string }>> =>
    umbraApi
      .get('/genre/movie/list')
      .then(({ data }) => convertSnakeToCamelCase(data))
      .then((res) => res.genres),

  getFilteredMovies: async ({
    page,
    genres,
    sortBy,
    voteAverage,
  }: {
    page: number;
    genres?: number[];
    sortBy?: string;
    voteAverage?: string;
  }): Promise<{
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
  }> => {
    const queryParams = {
      page,
      language: 'ko-KR',
      ...(genres?.length && { with_genres: genres.join(',') }),
      ...(sortBy && { sort_by: sortBy }),
      ...(voteAverage && { 'vote_average.gte': voteAverage }),
    };

    return umbraApi.get('/discover/movie', { params: queryParams }).then(({ data }) => convertSnakeToCamelCase(data));
  },
};

export { movieRepository };
export type { Movie, FilteredMoviesApiResponse };
