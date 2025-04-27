import React from 'react';
// import { useBookmarkStore } from '../../bookmarks/store/bookmark-store';
// import { useNotificationStore } from '../../bookmarks/store/notification-store';
import { MovieDetailsApiResponse } from '../../movie/movie-detail-repository';

const BookmarkButton = ({ movie }: { movie: MovieDetailsApiResponse }) => {
  // const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  // const { addNotification } = useNotificationStore();

  const handleBookmarkClick = () => {
    // if (isBookmarked(movie.id)) {
    //   removeBookmark(movie.id);
    //   addNotification({
    //     type: 'bookmark_remove',
    //     movieId: movie.id,
    //     movieTitle: movie.title,
    //   });
    // } else {
    //   addBookmark({
    //     id: movie.id,
    //     title: movie.title,
    //     posterPath: movie.posterPath,
    //     backdropPath: movie.backdropPath,
    //     overview: movie.overview,
    //   });
    //   addNotification({
    //     type: 'bookmark_add',
    //     movieId: movie.id,
    //     movieTitle: movie.title,
    //   });
    // }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      // aria-label={isBookmarked(movie.id) ? '북마크 제거' : '북마크 추가'}
    >
      {/* <span>{isBookmarked(movie.id) ? '북마크됨' : '북마크'}</span> */}
    </button>
  );
};

export { BookmarkButton };
