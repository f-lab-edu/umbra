import React, { Suspense, useEffect } from 'react';
import { useStore } from '@/store/store';
import { userAccountSelector } from '@/store/user-account';
import { useGetAccount } from '@/app/login/hooks/use-get-account';
import { useNavigate } from 'react-router';
import { ErrorBoundary } from '@/components/error-boundary';

const LoginInfo = () => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('session');
  const hasLoginSession = sessionId !== null;

  return (
    <>
      {hasLoginSession ? (
        // TODO: 서버문제로 인핸 재시도가 필요한경우 에러처리 필요 (근데 해당 컴포넌트 위치가 헤더영역이여서 고민..)
        <ErrorBoundary fallback={<></>}>
          <Suspense fallback={<div>로딩중</div>}>
            <AccountInfo sessionId={sessionId} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </button>
      )}
    </>
  );
};

const AccountInfo = ({ sessionId }: { sessionId: string }) => {
  const { data } = useGetAccount({ sessionId });
  const setUserAccountInfo = useStore(userAccountSelector.setUserAccountInfo);

  useEffect(() => {
    setUserAccountInfo({
      id: data.id,
      username: data.username,
    });
  }, [data]);

  return <div className="ml-4">{data.username}</div>;
};

export { LoginInfo };
