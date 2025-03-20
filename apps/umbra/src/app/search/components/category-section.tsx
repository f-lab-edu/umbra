import React from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { SearchCategory, Movie, Tv, Person } from '../types/search';

const typeGuards = {
  isMovie: (item: Movie | Tv | Person): item is Movie => item.mediaType === 'movie',
  isTv: (item: Movie | Tv | Person): item is Tv => item.mediaType === 'tv',
  isPerson: (item: Movie | Tv | Person): item is Person => item.mediaType === 'person',
};
const getSearchResultItemName = (item: Movie | Tv | Person): string => {
  if (typeGuards.isMovie(item)) return item.originalTitle;
  if (typeGuards.isTv(item) || typeGuards.isPerson(item)) return item.originalName;
  return '';
};
const CATEGORY_NAME_INFO: Record<SearchCategory, string> = {
  movies: '영화',
  tvs: 'TV 프로그램',
  persons: '인물',
} as const;

const AutoCompleteCategorySection = ({
  category,
  items,
  onItemClick,
}: {
  category: SearchCategory;
  items: Movie[] | Tv[] | Person[];
  onItemClick: (title: string) => void;
}) => {
  const handleFocus = (event: FocusEvent<HTMLLIElement>) => {
    const prevFocusedElement = document.querySelector('[data-state="focused"]');
    if (prevFocusedElement) {
      prevFocusedElement.removeAttribute('data-state');
    }

    event.currentTarget.setAttribute('data-state', 'focused');
  };

  const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
    event.currentTarget.removeAttribute('data-state');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, title: string) => {
    if (event.key === 'Enter') {
      onItemClick(title);
    }
  };

  return (
    <li className="py-3" data-category={category}>
      <div className="px-4">
        <span className="text-sm font-semibold text-gray-500 mb-2">{CATEGORY_NAME_INFO[category]}</span>
        <ul className="space-y-1">
          {items.map((item, index) => {
            const name = getSearchResultItemName(item);
            return (
              <li
                key={name + index}
                role="search-result-item"
                // 포커스 효과를 주기위해 tabIndex를 0으로 설정
                tabIndex={0}
                className="text-sm hover:bg-gray-50 px-2 py-1 rounded cursor-pointer focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => onItemClick(name)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(event) => handleKeyDown(event, name)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export { AutoCompleteCategorySection };
