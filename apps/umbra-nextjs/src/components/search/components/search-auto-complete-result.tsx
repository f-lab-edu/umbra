import React, { useState } from 'react';
import { AutoCompleteCategorySection } from './category-section';
import { SearchCategory } from '../types/search';
import { useGetSearchMulti } from '../hooks/use-get-search-multi';

const SEARCH_CATEGORIES: SearchCategory[] = ['movies', 'tvs', 'persons'];

const SearchAutoCompleteResult: React.FC<{
  searchKeyword: string;
  isValidSearchInput: boolean;
  onItemSelect: (title: string) => void;
}> = ({ searchKeyword, isValidSearchInput, onItemSelect }) => {
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
            <AutoCompleteCategorySection
              category={'movies'}
              items={data.movies.map((movie) => ({
                name: movie.originalTitle,
                profilePath: movie.posterPath,
              }))}
              onItemClick={onItemSelect}
              categoryName={'영화'}
            />
            <AutoCompleteCategorySection
              category={'tvs'}
              items={data.tvs.map((tv) => ({
                name: tv.originalName,
                profilePath: tv.posterPath,
              }))}
              onItemClick={onItemSelect}
              categoryName={'TV 프로그램'}
            />
            <AutoCompleteCategorySection
              category={'persons'}
              items={data.persons.map((person) => ({
                name: person.originalName,
                profilePath: person.profilePath,
              }))}
              onItemClick={onItemSelect}
              categoryName={'인물'}
            />
          </ul>
        </div>
      )}
    </>
  );
};

export { SearchAutoCompleteResult };
