import React, { KeyboardEventHandler } from 'react';
import { SearchInput } from '@/app/search/components/search-input';
import { useSearchParams } from 'react-router';

const SearchInputAndList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value.trim();
      setSearchParams({ keyword: inputValue });
    }
  };

  return (
    <>
      <SearchInput initInputValue={searchParams.get('keyword') ?? ''} onKeyDown={handleSearchInputKeyDown} />
    </>
  );
};

export { SearchInputAndList };
