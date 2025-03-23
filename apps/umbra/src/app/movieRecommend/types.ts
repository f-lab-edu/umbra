interface MovieRecommendationForm {
  genres: number[];
  releaseYear: number | undefined;
  rating: number;
  runtime: number;
  language: string;
  sortBy: string;
}

interface MovieDiscoverParams {
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
  'with_runtime.gte'?: number;
  with_keywords?: string;
  with_original_language?: string;
  include_adult?: boolean;
  sort_by?: string;
  page?: number;
  language?: string;
}

interface Movie {
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

export type { MovieRecommendationForm, MovieDiscoverParams, Movie };
