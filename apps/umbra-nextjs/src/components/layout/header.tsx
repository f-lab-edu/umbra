import Link from 'next/link';
import { NotificationBell } from './notification-bell';

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full py-3 px-10 border-b bg-white z-50">
      <div className="h-12 flex items-center space-x-6">
        <Link href="/movie">Umbra</Link>
        {/* TODO: 해당 컴포넌트를 무조건 클라이언트 사이드 렌더링을 해야 하는데 지금 Header 가 _app 에 레이아웃으로 구성되어 있어서,, 방법이 있을까요?.. */}
        {/* <NotificationBell /> */}
        <Link href="/bookmarks">북마크</Link>
        <Link href="/movie-recommend">영화 추천</Link>
      </div>
    </header>
  );
};

export { Header };
