import { useState } from 'react';
import { useNotificationStore } from '@/components/bookmarks/store/notification-store';
import Link from 'next/link';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="알림"
      >
        알림
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">알림</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm text-blue-500 hover:text-blue-600">
                  모두 읽음
                </button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">알림이 없습니다.</div>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  href={`/movie/${notification.movieId}`}
                  className={`block p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="ml-3">
                      <p className="text-sm text-gray-900">
                        {notification.type === 'bookmark_add'
                          ? `${notification.movieTitle}을(를) 북마크에 추가했습니다.`
                          : `${notification.movieTitle}을(를) 북마크에서 제거했습니다.`}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-4 border-t text-center">
              <Link href="/bookmarks" className="text-sm text-blue-500 hover:text-blue-600">
                북마크 목록 보기
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { NotificationBell };
