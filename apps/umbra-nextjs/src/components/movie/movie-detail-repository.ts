import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';
import { umbraApiWithServer } from '@/lib/umbra-api-with-server';

export interface MovieDetailsApiResponse {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: null | {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  };
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: Array<{
    id: number;
    logoPath: string | null;
    name: string;
    originCountry: string;
  }>;
  productionCountries: Array<{
    iso31661: string;
    name: string;
  }>;
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: Array<{
    englishName: string;
    iso6391: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface MovieCreditsApiResponse {
  id: number;
  cast: Array<{
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string | null;
    castId: number;
    character: string;
    creditId: string;
    order: number;
  }>;
  crew: Array<{
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string | null;
    creditId: string;
    department: string;
    job: string;
  }>;
}

export interface MovieVideosApiResponse {
  id: number;
  results: Array<{
    iso6391: string;
    iso31661: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    publishedAt: string;
    id: string;
  }>;
}

export interface MovieListResponse {
  page: number;
  results: Array<{
    id: number;
    title: string;
    posterPath: string;
    backdropPath: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
  }>;
  totalPages: number;
  totalResults: number;
}

export interface MovieReviewsResponse {
  id: number;
  page: number;
  results: Array<{
    author: string;
    authorDetails: {
      name: string;
      username: string;
      avatarPath: string | null;
      rating: number | null;
    };
    content: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    url: string;
  }>;
  totalPages: number;
  totalResults: number;
}

export interface MovieKeywordsResponse {
  id: number;
  keywords: Array<{
    id: number;
    name: string;
  }>;
}

export interface MovieImagesResponse {
  id: number;
  backdrops: Array<{
    aspectRatio: number;
    height: number;
    iso6391: string | null;
    filePath: string;
    voteAverage: number;
    voteCount: number;
    width: number;
  }>;
  posters: Array<{
    aspectRatio: number;
    height: number;
    iso6391: string | null;
    filePath: string;
    voteAverage: number;
    voteCount: number;
    width: number;
  }>;
}

export const movieDetailRepository = {
  getMovieDetail: async ({ id }: { id: string }): Promise<MovieDetailsApiResponse> =>
    umbraApiWithServer(`/movie/${id}`).then((res) => convertSnakeToCamelCase(res)),

  getMovieCredits: async ({ id }: { id: string }): Promise<MovieCreditsApiResponse> =>
    umbraApiWithServer(`/movie/${id}/credits`).then((res) => convertSnakeToCamelCase(res)),

  getMovieVideos: async ({ id }: { id: string }): Promise<MovieVideosApiResponse> =>
    umbraApiWithServer(`/movie/${id}/videos`).then((res) => convertSnakeToCamelCase(res)),

  getSimilarMovies: async ({ id }: { id: string }): Promise<MovieListResponse> =>
    umbraApiWithServer(`/movie/${id}/similar`).then((res) => convertSnakeToCamelCase(res)),

  getMovieRecommendations: async ({ id }: { id: string }): Promise<MovieListResponse> =>
    umbraApiWithServer(`/movie/${id}/recommendations`).then((res) => convertSnakeToCamelCase(res)),

  getMovieReviews: async ({ id }: { id: string }): Promise<MovieReviewsResponse> =>
    umbraApiWithServer(`/movie/${id}/reviews`).then((res) => convertSnakeToCamelCase(res)),

  getMovieKeywords: async ({ id }: { id: string }): Promise<MovieKeywordsResponse> =>
    umbraApiWithServer(`/movie/${id}/keywords`).then((res) => convertSnakeToCamelCase(res)),

  getMovieImages: async ({ id }: { id: string }): Promise<MovieImagesResponse> =>
    umbraApiWithServer(`/movie/${id}/images`).then((res) => convertSnakeToCamelCase(res)),
};
