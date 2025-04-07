import { useQuery } from '@tanstack/react-query';
import { movieRepository } from '@/pages/movie/movie-repository';

const useGetGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => movieRepository.getGenres(),
  });
};

export { useGetGenres };
