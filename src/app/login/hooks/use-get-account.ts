import { useMutation } from '@tanstack/react-query';
import { loginRepository, UserAccountInfo } from '@/app/login/login-repository';

const useGetAccount = ({ onSuccess, onError }: { onSuccess: (data: UserAccountInfo) => void; onError: () => void }) => {
  return useMutation({
    mutationFn: ({ sessionId }: { sessionId: string }) => loginRepository.getAccount({ sessionId }),
    onSuccess,
    onError,
  });
};

export { useGetAccount };
