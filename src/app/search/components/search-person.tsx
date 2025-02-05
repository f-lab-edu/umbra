import React from 'react';
import { Person } from '@/app/search/search-repository';
import { LazyImage } from '@/components/lazy-image';

const SearchPerson = ({ personList }: { personList: Person[] }) => {
  if (personList.length === 0) {
    return <div>검색결과 없음</div>;
  }

  return (
    <div className="flex space-x-10 space-y-5 flex-wrap">
      {personList.map((person: Person) => (
        <PersonItem key={person.originalName} {...person} />
      ))}
    </div>
  );
};

const PersonItem = ({ profilePath, originalName }: Person) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-hidden w-[200px] h-[200px] rounded-full">
        <LazyImage alt="프로필 이미지" src={`https://image.tmdb.org/t/p/w300/${profilePath}`} />
      </div>
      <div className="mt-5 text-xl font-bold">{originalName}</div>
    </div>
  );
};

export { SearchPerson };
