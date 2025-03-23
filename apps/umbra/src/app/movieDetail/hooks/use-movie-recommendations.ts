import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository } from '../movie-detail-repository';
import { MovieListResponse } from '../movie-detail-repository';

const useMovieRecommendations = (movieId: string) => {
  return useSuspenseQuery<MovieListResponse>({
    queryKey: ['movie', movieId, 'recommendations'],
    queryFn: () => movieDetailRepository.getMovieRecommendations({ id: movieId }),
  });
};

const useSimilarMovies = (movieId: string) => {
  return useSuspenseQuery<MovieListResponse>({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => movieDetailRepository.getSimilarMovies({ id: movieId }),
  });
};

export { useMovieRecommendations, useSimilarMovies };
