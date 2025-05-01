import React, { useState } from 'react';
import { useGetSearchMulti } from '../hooks/use-get-search-multi';
import { SearchPerson } from './search-person';
import { SearchMovie } from './search-movie';
import { SearchTv } from './search-tv';
import { useRouter, useSearchParams } from 'next/navigation';

const PERSON = 'person';
const TV = 'tv';
const MOVIE = 'movie';

type Menu = 'person' | 'tv' | 'movie';

const TAB_MENU_LIST: Array<Menu> = ['person', 'tv', 'movie'] as const;
const MENU_NAME: Record<Menu, string> = {
  person: '인물',
  tv: 'TV',
  movie: '영화',
} as const;

const SearchResult = () => {
  const searchParams = useSearchParams();
  const { data } = useGetSearchMulti({ keyword: searchParams.get('keyword') ?? '' });
  const [currentTab, setCurrentTab] = useState<Menu>(PERSON);

  const handleMenuClick = (menu: Menu) => {
    setCurrentTab(menu);
  };

  const currentTabContent = (() => {
    if (currentTab === PERSON) {
      return <SearchPerson personList={data.persons} />;
    }

    if (currentTab === MOVIE) {
      return <SearchMovie movieList={data.movies} />;
    }

    if (currentTab === TV) {
      return <SearchTv tvList={data.tvs} />;
    }

    return null;
  })();

  return (
    <div className="p-10 flex flex-col space-y-10">
      <div className="flex space-x-10">
        {TAB_MENU_LIST.map((menu) => (
          <div
            key={menu}
            className={`text-3xl font-bold cursor-pointer hover:bg-gray-200 rounded p-1 ${
              currentTab === menu ? 'bg-blue-200' : ''
            }`}
            onClick={() => {
              handleMenuClick(menu);
            }}
          >
            {MENU_NAME[menu]}
          </div>
        ))}
      </div>
      <div>{currentTabContent}</div>
    </div>
  );
};

export { SearchResult };
