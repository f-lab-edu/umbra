import { SearchCategory } from '../types/search';

/**
 * TODO: Ref 이용해서 변경하려고 했으니 먼가 ref 값이 관리가 제대로 되지 않아서 고민중..
 *      - 관리가 안되는 이유
 *        1. 자동완성 결과 값이 검색어따라서 변경되므로 매번 초기화 해주어야 함.
 *        2. 그 초기화 시점이 잘못되었는지 빈배열이 들어감..
 *
 */
// DOM 조작 유틸리티
const domUtils = {
  // 검색 결과 아이템 요소들 가져오기
  getSearchSearchResultItems: (): HTMLElement[] => {
    const categories: SearchCategory[] = ['movies', 'tvs', 'persons'];
    return categories.flatMap((category) =>
      Array.from(document.querySelectorAll(`[data-category="${category}"] [role="search-result-item"]`)),
    );
  },

  // 현재 포커스된 요소의 인덱스 가져오기
  getCurrentFocusedIndex: (searchResultItems: HTMLElement[]): number => {
    return searchResultItems.findIndex((searchResultItem) => searchResultItem.getAttribute('data-state') === 'focused');
  },

  // 요소에 포커스 주기 및 스크롤
  focusAndScrollElement: (element: HTMLElement): void => {
    // 이전 포커스 제거
    const prevFocusedElement = document.querySelector('[data-state="focused"]');
    if (prevFocusedElement) {
      prevFocusedElement.removeAttribute('data-state');
    }

    // 새로운 포커스 설정
    element.setAttribute('data-state', 'focused');
    element.focus();
    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  },

  // 포커스 초기화 및 입력 필드로 포커스 이동
  resetFocusAndFocusInput: (): void => {
    // 이전 포커스 제거
    const prevFocusedElement = document.querySelector('[data-state="focused"]');
    if (prevFocusedElement) {
      prevFocusedElement.removeAttribute('data-state');
    }

    const searchInputElement = document.querySelector('#search-input') as HTMLInputElement;

    if (searchInputElement) {
      searchInputElement.focus();
    }
  },
};

// 키보드 네비게이션 핸들러
const keyboardHandlers = {
  // 아래 방향키 처리
  handleArrowDown: (searchResultItems: HTMLElement[], currentFucusedIndex: number): void => {
    const nextIndex = currentFucusedIndex < searchResultItems.length - 1 ? currentFucusedIndex + 1 : 0;
    domUtils.focusAndScrollElement(searchResultItems[nextIndex]);
  },

  // 위 방향키 처리
  handleArrowUp: (searchResultItems: HTMLElement[], currentFucusedIndex: number): void => {
    const prevIndex = currentFucusedIndex > 0 ? currentFucusedIndex - 1 : searchResultItems.length - 1;
    domUtils.focusAndScrollElement(searchResultItems[prevIndex]);
  },

  // ESC키 처리
  handleEscape: (): void => {
    domUtils.resetFocusAndFocusInput();
  },
};

export { domUtils, keyboardHandlers };
