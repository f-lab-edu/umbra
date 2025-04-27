import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bookmark {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (movie: Omit<Bookmark, 'addedAt'>) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (movie) => {
        const bookmark: Bookmark = {
          ...movie,
        };
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        }));
      },
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        }));
      },
      isBookmarked: (id) => {
        return get().bookmarks.some((bookmark) => bookmark.id === id);
      },
    }),
    {
      name: 'movie-bookmarks',
    },
  ),
);

export { useBookmarkStore };
