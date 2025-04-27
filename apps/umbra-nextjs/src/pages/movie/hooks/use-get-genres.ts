import { useSuspenseQuery } from '@tanstack/react-query';
import { movieRepository } from '@/pages/movie/movie-repository';

const useGetGenres = () => {
  return useSuspenseQuery({
    queryKey: ['genres'],
    queryFn: () => movieRepository.getGenres(),
  });
};

export { useGetGenres };
