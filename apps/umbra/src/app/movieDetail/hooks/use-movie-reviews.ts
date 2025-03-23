import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository, MovieKeywordsResponse, MovieReviewsResponse } from '../movie-detail-repository';

const useMovieReviews = (movieId: string) => {
  return useSuspenseQuery<MovieReviewsResponse>({
    queryKey: ['movie', movieId, 'reviews'],
    queryFn: () => movieDetailRepository.getMovieReviews({ id: movieId }),
  });
};

export { useMovieReviews };
