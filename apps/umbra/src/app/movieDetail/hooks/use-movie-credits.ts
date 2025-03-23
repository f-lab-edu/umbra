import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository } from '../movie-detail-repository';
import { MovieCreditsApiResponse } from '../movie-detail-repository';

export const useMovieCredits = (movieId: string) => {
  return useSuspenseQuery<MovieCreditsApiResponse>({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => movieDetailRepository.getMovieCredits({ id: movieId }),
  });
};
