import { useMutation } from '@tanstack/react-query';
import { loginRepository, RequestTokenInfo } from '../login-repository';

const useGetCreateRequestToken = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: RequestTokenInfo) => void;
  onError: () => void;
}) => {
  return useMutation({
    mutationFn: () => loginRepository.createRequestToken(),
    onSuccess,
    onError,
  });
};

export { useGetCreateRequestToken };
