import React, { KeyboardEventHandler } from 'react';
import { SearchInput } from '@/app/search/components/search-input';
import { useLocation, useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value.trim();
      navigate(`/search?keyword=${inputValue}`);
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full py-3 px-10 border-b bg-white z-50">
      <div className="h-12 flex items-center space-x-6">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate('/movie');
          }}
        >
          Umbra
        </div>
        {location.pathname !== '/search' && (
          <div className="w-50">
            <SearchInput initInputValue={''} onKeyDown={handleSearchInputKeyDown} />
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
