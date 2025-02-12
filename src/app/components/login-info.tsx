import React, { Suspense, useEffect } from 'react';
import { useStore } from '@/store/store';
import { userAccountSelector } from '@/store/user-account';
import { useGetAccount } from '@/app/login/hooks/use-get-account';
import { useNavigate } from 'react-router';
import { ErrorBoundary } from '@/components/error-boundary';
import { useLogout } from '@/app/login/hooks/use-logout';

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
  const navigate = useNavigate();
  const setUserAccountInfo = useStore(userAccountSelector.setUserAccountInfo);

  const { data } = useGetAccount({ sessionId });
  const { mutate: logoutMutate } = useLogout({
    onSuccess: (data) => {
      if (data.success) {
        localStorage.removeItem('session');
        setUserAccountInfo(null);
        navigate('/');
      } else {
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    },
    onError: () => {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    setUserAccountInfo({
      id: data.id,
      username: data.username,
    });
  }, [data]);

  const handleLogout = () => {
    logoutMutate({ sessionId: sessionId });
  };

  return (
    <div className="ml-4">
      <span>{data.username}</span>
      <button className="ml-4" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export { LoginInfo };
