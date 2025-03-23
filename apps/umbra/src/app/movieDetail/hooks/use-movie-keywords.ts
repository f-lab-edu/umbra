import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository, MovieKeywordsResponse } from '../movie-detail-repository';

const useMovieKeywords = (movieId: string) => {
  return useSuspenseQuery<MovieKeywordsResponse>({
    queryKey: ['movie', movieId, 'keywords'],
    queryFn: () => movieDetailRepository.getMovieKeywords({ id: movieId }),
  });
};

export { useMovieKeywords };
