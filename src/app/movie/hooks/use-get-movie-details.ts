import { useSuspenseQuery } from '@tanstack/react-query';
import { movieRepository } from '@/app/movie/movie-repository';

const useGetMovieDetails = ({ id }: { id: number }) => {
  return useSuspenseQuery({
    queryKey: ['getMovieDetails', id],
    queryFn: () => movieRepository.getMovieDetail({ id }),
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export { useGetMovieDetails };
