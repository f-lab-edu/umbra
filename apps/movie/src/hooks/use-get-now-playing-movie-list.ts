import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { movieRepository } from '../movie-repository';

const useGetNowPlayingMovieList = ({ page }: { page: number }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['nowPlayingMovieList'],
    queryFn: ({ pageParam }) => movieRepository.getNowPlayingList({ page: pageParam }),
    getNextPageParam: (lastPage): number | null => {
      const nextPage = lastPage.page + 1;
      return nextPage >= lastPage.totalPages ? null : nextPage;
    },
    select: (data) => {
      return {
        pages: data.pages.flatMap((page) => page.results),
      };
    },
    initialPageParam: page,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export { useGetNowPlayingMovieList };
