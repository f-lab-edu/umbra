import React, { useEffect } from 'react';
import { useGetCreateSession } from '@/app/login/hooks/use-post-create-session';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetAccount } from '@/app/login/hooks/use-get-account';

const LoginFallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate: userAccountMutate } = useGetAccount({
    onSuccess: (data) => {
      // TODO: 전역상태에 계정정보 저장
      console.log(data);
    },
    onError: () => {
      alert('유저정보를 가져오는데 실패하였습니다.');
      navigate('/login');
    },
  });
  const { mutate } = useGetCreateSession({
    onSuccess: (data) => {
      localStorage.setItem('session', data.sessionId);
      userAccountMutate({ sessionId: data.sessionId });
      navigate('/movie');
    },
    onError: () => {
      alert('세션정보를 가져오는데 실패하였습니다.');
      navigate('/login');
    },
  });

  useEffect(() => {
    const requestToken = searchParams.get('request_token');
    mutate({ requestToken: requestToken ?? '' });
  }, []);

  return <div className="flex flex-col px-10 py-6">로그인중...</div>;
};

export default LoginFallbackPage;
