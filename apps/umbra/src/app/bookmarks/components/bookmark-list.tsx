import React from 'react';
import { useBookmarkStore } from '../store/bookmark-store';
import { Link } from 'react-router';

const BookmarkList = () => {
  const { bookmarks } = useBookmarkStore();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">북마크한 영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {bookmarks.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative aspect-[2/3]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export { BookmarkList };
