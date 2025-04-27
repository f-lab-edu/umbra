import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { movieRecommendRepository } from '../movie-recommend-repository';

const useGetGenre = ({ page }: { page: string }) => {
  return useSuspenseQuery({
    queryKey: ['genres', page],
    queryFn: movieRecommendRepository.getGenres,
  });
};

export { useGetGenre };
