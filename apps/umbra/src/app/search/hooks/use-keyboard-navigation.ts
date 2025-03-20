import { domUtils, keyboardHandlers } from '../utils/search-utils';

// 키보드 네비게이션 훅
const useKeyboardNavigation = (): {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
} => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    /**
     * 방향키 이벤트는 기본 동작 막기
     *  - 방향키 동작시 브라우저 스크롤을 방지하기 위해 사용
     */
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
    }

    const searchResultItems = domUtils.getSearchSearchResultItems();

    // 검색 결과 아이템이 없으면 키보드 이벤트 처리 안함
    if (searchResultItems.length === 0) return;

    const currentFocusedIndex = domUtils.getCurrentFocusedIndex(searchResultItems);

    // 키보드 이벤트 처리
    switch (event.key) {
      case 'ArrowDown':
        keyboardHandlers.handleArrowDown(searchResultItems, currentFocusedIndex);
        break;
      case 'ArrowUp':
        keyboardHandlers.handleArrowUp(searchResultItems, currentFocusedIndex);
        break;
      case 'Escape':
        keyboardHandlers.handleEscape();
        break;
    }
  };

  return { handleKeyDown };
};

export { useKeyboardNavigation };
