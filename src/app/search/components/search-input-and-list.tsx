import React, { KeyboardEventHandler } from 'react';
import { SearchInput } from '@/app/search/components/search-input';
import { useSearchParams } from 'react-router';
import { SearchResult } from '@/app/search/components/search-result';
import { ErrorBoundary } from '@/components/error-boundary';

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
      <ErrorBoundary fallback={<div>에러</div>}>
        <SearchResult />
      </ErrorBoundary>
    </>
  );
};

export { SearchInputAndList };
