import React, { useEffect } from 'react';

import { useDebounce } from '../hooks/use-debounce';
import { useKeyboardNavigation } from '../hooks/use-keyboard-navigation';
import { SearchAutoCompleteResult } from './search-auto-complete-result';
import { useSearchInput } from '../hooks/use-search-input';

const SearchInput: React.FC<{
  initInputValue: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ initInputValue, onKeyDown }) => {
  const {
    searchKeyword,
    isSearchInputFocused,
    inputRef,
    handleInputChange,
    handleItemSelect,
    handleSearchInputBlur,
    handleSearchInputFocus,
  } = useSearchInput(initInputValue);
  const debouncedSearchKeyword = useDebounce<string>(searchKeyword, 500);
  const { handleKeyDown } = useKeyboardNavigation();

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (isSearchInputFocused) {
        handleKeyDown(event as unknown as React.KeyboardEvent<HTMLInputElement>);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isSearchInputFocused, handleKeyDown]);

  return (
    <div className="relative w-full">
      {/* 검색 입력 필드 */}
      <div className="w-full z-40 h-10 rounded border flex items-center px-4 py-[10px] bg-[#28292E0A]">
        <input
          id="search-input"
          ref={inputRef}
          value={searchKeyword}
          onChange={handleInputChange}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
          onKeyDown={onKeyDown}
          type="text"
          className="overflow-x-auto appearance-none flex-1 bg-transparent focus:outline-none"
          placeholder="검색"
        />
      </div>

      {/* 자동완성 결과 */}
      <SearchAutoCompleteResult
        searchKeyword={debouncedSearchKeyword}
        isValidSearchInput={isSearchInputFocused && debouncedSearchKeyword.length > 0}
        onItemSelect={handleItemSelect}
      />
    </div>
  );
};

export { SearchInput };
