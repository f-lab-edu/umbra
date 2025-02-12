import React from 'react';
import { useGetCreateRequestToken } from '@/app/login/hooks/use-get-create-request-token';

const LoginPage = () => {
  const { mutate } = useGetCreateRequestToken({
    onSuccess: (data) => {
      // TODO: 리다이렉트된 URL로 인증정보를 받아오는데 페이지를 이탈하는 방법이여서 이 방법이 최선인가?! 하는 고민..
      window.location.href = `https://www.themoviedb.org/authenticate/${data.requestToken}?redirect_to=http://localhost:3000/loginfallback`;
    },
    onError: () => {
      alert('로그인 실패');
    },
  });

  const handleLoginButtonClick = () => {
    mutate();
  };

  return (
    <div className="flex flex-col px-10 py-6">
      <button onClick={handleLoginButtonClick}>tmdb 로그인</button>
    </div>
  );
};

export default LoginPage;
