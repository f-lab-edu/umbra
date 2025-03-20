import React, { useState } from 'react';
import { AutoCompleteCategorySection } from './category-section';
import { SearchCategory } from '../types/search';
import { useGetSearchMulti } from '../hooks/use-get-search-multi';

const SEARCH_CATEGORIES: SearchCategory[] = ['movies', 'tvs', 'persons'];

const SearchAutoCompleteResult = ({
  searchKeyword,
  isValidSearchInput,
  onItemSelect,
}: {
  searchKeyword: string;
  isValidSearchInput: boolean;
  onItemSelect: (title: string) => void;
}) => {
  const [isSearchResultBoxFocused, setIsSearchResultBoxFocused] = useState(false);
  const { data, isSuccess } = useGetSearchMulti({ keyword: searchKeyword });
  const handleMouseEnter = () => {
    setIsSearchResultBoxFocused(true);
  };
  const handleMouseLeave = () => {
    setIsSearchResultBoxFocused(false);
  };

  const isOpen = isSuccess && (isValidSearchInput || isSearchResultBoxFocused);

  return (
    <>
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="divide-y divide-gray-100">
            {SEARCH_CATEGORIES.map((category) => (
              <AutoCompleteCategorySection
                key={category}
                category={category}
                items={data[category]}
                onItemClick={onItemSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export { SearchAutoCompleteResult };
