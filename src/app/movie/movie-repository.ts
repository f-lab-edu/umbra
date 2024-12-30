import { umbraApi } from '@/lib/umbraApi';

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

const movieRepository = {
  getNowPlayingList: async ({ page }: { page: number }): Promise<NowPlayingMovieApiResponse> => {
    const { data } = await umbraApi.get(`/movie/now_playing?page=${page}`);
    return data;
  },
};

export { movieRepository };
