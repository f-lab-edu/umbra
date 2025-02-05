import React, { useState } from 'react';
import { useGetSearchMulti } from '@/app/search/hooks/use-get-search-multi';
import { useSearchParams } from 'react-router';
import { SearchPerson } from '@/app/search/components/search-person';
import { SearchMovie } from '@/app/search/components/search-movie';
import { SearchTv } from '@/app/search/components/search-tv';

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
  const [searchParams] = useSearchParams();
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
            className={`text-3xl font-bold cursor-pointer hover:bg-gray-200 rounded p-1 ${currentTab === menu ? 'bg-blue-200' : ''}`}
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
