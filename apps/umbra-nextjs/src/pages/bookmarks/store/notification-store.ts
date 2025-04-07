import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'bookmark_add' | 'bookmark_remove';
  movieId: number;
  movieTitle: string;
  timestamp: string;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const getInitialState = (): Notification[] => {
  const stored = localStorage.getItem('movie-notifications');
  if (!stored) return [];
  return JSON.parse(stored).state?.notifications || [];
};

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: getInitialState(),
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(),
          timestamp: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
        }));
      },
      get unreadCount() {
        return get().notifications.filter((notification) => !notification.read).length;
      },
    }),
    {
      name: 'movie-notifications',
    },
  ),
);

export { useNotificationStore };
