import React, { KeyboardEventHandler, Suspense } from 'react';
import { SearchInput } from '@/app/search/components/search-input';
import { useSearchParams } from 'react-router';
import { SearchResult } from '@/app/search/components/search-result';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorFallback } from '@/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';

const SearchInputAndList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const handleSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value.trim();
      setSearchParams({ keyword: inputValue });
    }
  };

  const handleSearchErrorRetry = () => {
    queryClient.invalidateQueries({
      queryKey: ['getSearchMulti', searchParams.get('keyword') ?? ''],
      refetchType: 'all',
    });
  };

  return (
    <>
      <SearchInput initInputValue={searchParams.get('keyword') ?? ''} onKeyDown={handleSearchInputKeyDown} />
      <ErrorBoundary fallback={<ErrorFallback onRetry={handleSearchErrorRetry} />}>
        <Suspense fallback={<div>로딩중</div>}>
          <SearchResult />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export { SearchInputAndList };
