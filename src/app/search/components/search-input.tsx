import React, { KeyboardEventHandler } from 'react';
import { SearchIcon } from '@/assests/search-icon';

const SearchInput = ({
  initInputValue,
  onKeyDown,
}: {
  initInputValue: string;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="w-full z-40 h-10 rounded border flex items-center px-4 py-[10px] bg-[#28292E0A]">
      <div className="mr-4">
        <SearchIcon />
      </div>
      <input
        defaultValue={initInputValue}
        type="text"
        className="overflow-x-auto appearance-none flex-1 bg-transparent focus:outline-none"
        placeholder="검색"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export { SearchInput };
