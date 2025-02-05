import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { searchRepository } from '@/app/search/search-repository';

const useGetSearchMulti = ({ keyword }: { keyword: string }) => {
  return useSuspenseQuery({
    queryKey: ['getSearchMulti', keyword],
    queryFn: () => searchRepository.getSearchMulti({ keyword }),
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export { useGetSearchMulti };
