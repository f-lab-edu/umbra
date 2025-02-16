import { useMutation } from '@tanstack/react-query';
import { loginRepository, NewSession } from '../login-repository';

const useGetCreateSession = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: NewSession) => void;
  onError: () => void;
}) => {
  return useMutation({
    mutationFn: ({ requestToken }: { requestToken: string }) => loginRepository.createSession({ requestToken }),
    onSuccess,
    onError,
  });
};

export { useGetCreateSession };
