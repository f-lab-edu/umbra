import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';
import { umbraApi } from '@/lib/umbraApi';
import { MovieDiscoverParams } from './types';

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
  originalLanguage: string;
  adult: boolean;
  popularity: number;
}

interface MovieDiscoverResponse {
  page: number;
  results: Movie[];
}

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

const movieRecommendRepository = {
  getGenres: async (): Promise<GenreResponse> =>
    umbraApi.get('/genre/movie/list').then((res) => convertSnakeToCamelCase(res.data)),
  getMovies: async (params: MovieDiscoverParams): Promise<MovieDiscoverResponse> =>
    umbraApi.get('/discover/movie', { params }).then((res) => convertSnakeToCamelCase(res.data)),
};

export { movieRecommendRepository };
