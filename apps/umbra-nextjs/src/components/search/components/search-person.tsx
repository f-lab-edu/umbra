import React from 'react';
import { Person } from '../search-repository';
import Image from 'next/image';

const SearchPerson: React.FC<{ personList: Person[] }> = ({ personList }) => {
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

const PersonItem: React.FC<Person> = ({ profilePath, originalName }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-hidden w-[200px] h-[200px] rounded-full">
        <Image alt="프로필 이미지" src={`https://image.tmdb.org/t/p/w300/${profilePath}`} width={300} height={300} />
      </div>
      <div className="mt-5 text-xl font-bold">{originalName}</div>
    </div>
  );
};

export { SearchPerson };
