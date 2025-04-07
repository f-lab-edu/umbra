import { useQuery } from '@tanstack/react-query';
import { movieRecommendRepository } from '../movie-recommend-repository';

const useGetGenre = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: movieRecommendRepository.getGenres,
  });
};

export { useGetGenre };
