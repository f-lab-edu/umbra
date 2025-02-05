import React from 'react';
import { Tv } from '@/app/search/search-repository';
import { LazyImage } from '@/components/lazy-image';

const SearchTv = ({ tvList }: { tvList: Tv[] }) => {
  if (tvList.length === 0) {
    return <>검색결과 없음</>;
  }

  return (
    <div className="flex space-x-10 space-y-5 flex-wrap">
      {tvList.map((tv) => (
        <TvItem key={tv.originalName} {...tv} />
      ))}
    </div>
  );
};

const TvItem = ({ originalName, posterPath }: Tv) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-hidden w-[200px] h-[200px] rounded-lg">
        <LazyImage alt="TV 이미지" src={`https://image.tmdb.org/t/p/w300/${posterPath}`} />
      </div>
      <div className="mt-5 text-xl font-bold">{originalName}</div>
    </div>
  );
};

export { SearchTv };
