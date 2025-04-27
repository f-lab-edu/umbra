import { useSuspenseQuery } from '@tanstack/react-query';
import { movieRepository } from '@/components/movie/movie-repository';

const useGetMovieTopRated = () => {
  return useSuspenseQuery({
    queryKey: ['getMovieTopRated'],
    queryFn: () => movieRepository.getMovieTopRated(),
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export { useGetMovieTopRated };
