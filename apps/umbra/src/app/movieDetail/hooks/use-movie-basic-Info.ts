import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository } from '../movie-detail-repository';
import { MovieDetailsApiResponse } from '../movie-detail-repository';

const useMovieBasicInfo = (movieId: string) => {
  return useSuspenseQuery<MovieDetailsApiResponse>({
    queryKey: ['movie', movieId, 'basic'],
    queryFn: () => movieDetailRepository.getMovieDetail({ id: movieId }),
  });
};

export { useMovieBasicInfo };
