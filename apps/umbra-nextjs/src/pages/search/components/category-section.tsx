import React from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { SearchCategory, Movie, Tv, Person, SearchResult } from '../types/search';

const AutoCompleteCategorySection: React.FC<{
  category: SearchCategory;
  items: SearchResult[];
  onItemClick: (title: string) => void;
  categoryName: string;
}> = ({ category, items, onItemClick, categoryName }) => {
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
        <span className="text-sm font-semibold text-gray-500 mb-2">{categoryName}</span>
        <ul className="space-y-1">
          {items.map((item, index) => {
            return (
              <li
                key={item.name + index}
                role="search-result-item"
                // 포커스 효과를 주기위해 tabIndex를 0으로 설정
                tabIndex={0}
                className="text-sm hover:bg-gray-50 px-2 py-1 rounded cursor-pointer focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => onItemClick(item.name)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(event) => handleKeyDown(event, item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export { AutoCompleteCategorySection };
