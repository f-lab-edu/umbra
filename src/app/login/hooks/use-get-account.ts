import { useSuspenseQuery } from '@tanstack/react-query';
import { loginRepository } from '@/app/login/login-repository';

const useGetAccount = ({ sessionId }: { sessionId: string }) => {
  return useSuspenseQuery({
    queryKey: ['getAccount', sessionId],
    queryFn: () => loginRepository.getAccount({ sessionId }),
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export { useGetAccount };
