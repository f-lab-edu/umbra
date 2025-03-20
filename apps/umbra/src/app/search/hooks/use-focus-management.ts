import type { FocusEvent, RefObject } from 'react';

const useFocusManagement = (
  inputRef: RefObject<HTMLInputElement | null>,
  setIsFocused: (isFocused: boolean) => void,
) => {
  const handleSearchInputFocus = () => {
    setIsFocused(true);
    inputRef.current?.setAttribute('data-state', 'focused');
  };

  const handleSearchInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('[data-category]')) {
      return;
    }
    setIsFocused(false);
    inputRef.current?.removeAttribute('data-state');
  };

  return {
    handleSearchInputFocus,
    handleSearchInputBlur,
  };
};

export { useFocusManagement };
