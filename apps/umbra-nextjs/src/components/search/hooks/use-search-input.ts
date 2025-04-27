import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useFocusManagement } from './use-focus-management';

const useSearchInput = (initInputValue: string) => {
  const [searchKeyword, setSearchKeyword] = useState(initInputValue);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSearchInputBlur, handleSearchInputFocus } = useFocusManagement(inputRef, setIsSearchInputFocused);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  const handleItemSelect = (title: string) => {
    setSearchKeyword(title);
    setIsSearchInputFocused(false);

    inputRef.current?.removeAttribute('data-state');
    inputRef.current?.focus();
  };

  return {
    searchKeyword,
    isSearchInputFocused,
    inputRef,
    handleInputChange,
    handleItemSelect,
    setIsSearchInputFocused,
    handleSearchInputBlur,
    handleSearchInputFocus,
  };
};

export { useSearchInput };
