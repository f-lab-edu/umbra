import React from 'react';
import { BookmarkList } from './components/bookmark-list';

const BookmarksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">북마크한 영화</h1>
      <BookmarkList />
    </div>
  );
};

export { BookmarksPage };
