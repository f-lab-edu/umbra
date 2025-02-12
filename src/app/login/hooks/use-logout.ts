import { useMutation } from '@tanstack/react-query';
import { loginRepository, LogoutResponse } from '@/app/login/login-repository';

const useLogout = ({ onSuccess, onError }: { onSuccess: (data: LogoutResponse) => void; onError: () => void }) => {
  return useMutation({
    mutationFn: ({ sessionId }: { sessionId: string }) => loginRepository.logout({ sessionId }),
    onSuccess,
    onError,
  });
};

export { useLogout };
