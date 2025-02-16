import { umbraApi } from '../../lib/umbraApi';
import { convertSnakeToCamelCase } from '../../lib/convert-snake-to-camel-case';

interface NowPlayingMovieApiResponse {
  page: number;
  results: {
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
  };
  totalPages: number;
}

interface MovieDetailsApiResponse {
  originalTitle: string;
  posterPath: string;
}

interface MovieTopRatedApiResponse {
  results: Array<{
    id: number;
    backdropPath: string;
    originalTitle: string;
  }>;
}

const movieRepository = {
  getNowPlayingList: async ({ page }: { page: number }): Promise<NowPlayingMovieApiResponse> =>
    umbraApi.get(`/movie/now_playing?page=${page}`).then((res) => convertSnakeToCamelCase(res.data)),
  getMovieDetail: async ({ id }: { id: number }): Promise<MovieDetailsApiResponse> =>
    umbraApi.get(`/movie/${id}`).then((res) => convertSnakeToCamelCase(res.data)),
  getMovieTopRated: async (): Promise<MovieTopRatedApiResponse> =>
    umbraApi.get('movie/top_rated').then((res) => convertSnakeToCamelCase(res.data)),
};

export { movieRepository };
