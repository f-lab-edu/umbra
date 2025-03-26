import { useQuery } from '@tanstack/react-query';
import { movieRepository } from '../movie-repository';

const useGetGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => movieRepository.getGenres(),
  });
};

export { useGetGenres };
