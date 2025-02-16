import React, { Children, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

const INIT_ITEM_INDEX = 3;
const TRANSITION_TIME = 300;

const Carousel = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(INIT_ITEM_INDEX);
  const [itemWidth, setItemWidth] = useState<number | null>(null);
  const slideWindowRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isShowTransition, setIsShowTransition] = useState(false);

  const slideList = Children.toArray(children);
  const slideCount = slideList.length;
  const newSlideList = [...slideList.slice(-INIT_ITEM_INDEX), ...slideList, ...slideList.slice(0, INIT_ITEM_INDEX)];

  // itemWidth 동적 대응
  useLayoutEffect(() => {
    if (itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth;
      setItemWidth(itemWidth);
    }
  }, []);

  useEffect(() => {
    if (!slideWindowRef.current || itemWidth === null) return;

    const slide = slideWindowRef.current;
    slide.style.transition = isShowTransition ? `transform ${TRANSITION_TIME}ms ease-in-out` : 'none';
    slide.style.transform = `translateX(-${index * itemWidth}px)`;

    // 타임아웃과 트랜지션 시간을 동일하게 하여 바로 이동하는것처럼 보임
    const timeoutId = setTimeout(() => {
      setIsShowTransition(false);

      if (index <= INIT_ITEM_INDEX - 1) {
        // 왼쪽 복제본에 위치한 경우
        setIndex(slideCount + index);
      } else if (index >= slideCount + INIT_ITEM_INDEX) {
        // 오른쪽 복제본에 위치한 경우
        setIndex(index - slideCount);
      }
    }, TRANSITION_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, itemWidth]);

  const handlePrevSlideButtonClick = () => {
    setIsShowTransition(true);
    setIndex((prev) => prev - 1);
  };

  const handleNextSlideButtonClick = () => {
    setIsShowTransition(true);
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div ref={slideWindowRef} className="flex h-full">
        {newSlideList.map((slideItem, index) => (
          <div ref={index === INIT_ITEM_INDEX ? itemRef : null} key={index} className="h-full">
            {slideItem}
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevSlideButtonClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-300 text-white p-2 rounded-full"
      >
        Prev
      </button>
      <button
        onClick={handleNextSlideButtonClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-300 text-white p-2 rounded-full"
      >
        Next
      </button>
    </div>
  );
};

export { Carousel };
