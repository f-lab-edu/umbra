import React, { KeyboardEventHandler, Suspense } from 'react';
import { SearchInput } from './search-input';
import { SearchResult } from './search-result';
import { ErrorBoundary } from './error-boundary';
import { ErrorFallback } from './error-fallback';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInputAndList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const queryClient = useQueryClient();

  const handleSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value.trim();
      router.push(`/search?keyword=${inputValue}`);
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
