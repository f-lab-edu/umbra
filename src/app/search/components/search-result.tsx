import React from 'react';
import { useGetSearchMulti } from '@/app/search/hooks/use-get-search-multi';
import { useSearchParams } from 'react-router';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { isLoading } = useGetSearchMulti({ keyword: searchParams.get('keyword') ?? '' });

  if (isLoading) {
    return <>로딩중..</>;
  }

  return <>{/* TODO: ui 적용  */}</>;
};

export { SearchResult };
