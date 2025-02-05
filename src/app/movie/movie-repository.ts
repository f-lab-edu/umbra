import { umbraApi } from '@/lib/umbraApi';
import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';

interface NowPlayingMovieApiResponse {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  total_pages: number;
}

interface MovieDetailsApiResponse {
  originalTitle: string;
}

const movieRepository = {
  getNowPlayingList: async ({ page }: { page: number }): Promise<NowPlayingMovieApiResponse> => {
    const { data } = await umbraApi.get(`/movie/now_playing?page=${page}`);
    return data;
  },
  getMovieDetail: async ({ id }: { id: number }): Promise<MovieDetailsApiResponse> =>
    umbraApi.get(`/movie/${id}`).then((res) => convertSnakeToCamelCase(res.data)),
};

export { movieRepository };
