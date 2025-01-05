import React, { ReactNode, useEffect, useRef, useState } from 'react';

const Carousel = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);
  const slideWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideWindowRef.current) return;
    const slide = slideWindowRef.current;

    slide.style.transition = 'transform 300ms ease-in-out';

    // TODO: 아이템 width 가 200으로 고정되어있음 동적으로 변경해야 함
    slide.style.transform = `translateX(-${index * 200}px)`;
  }, [index]);

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div ref={slideWindowRef} className="flex h-full">
        {children}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-300 text-white p-2 rounded-full"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-300 text-white p-2 rounded-full"
      >
        Next
      </button>
    </div>
  );
};

export { Carousel };
