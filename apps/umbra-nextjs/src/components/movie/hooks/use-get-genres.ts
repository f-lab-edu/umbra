import { useSuspenseQuery } from '@tanstack/react-query';
import { movieRepository } from '@/components/movie/movie-repository';

const useGetGenres = () => {
  return useSuspenseQuery({
    queryKey: ['genres'],
    queryFn: () => movieRepository.getGenres(),
  });
};

export { useGetGenres };
