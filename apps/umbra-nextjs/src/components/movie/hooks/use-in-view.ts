import { useEffect, useRef } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useInView = <T extends HTMLElement>(
  handleIntersect: () => void,
  { root = null, rootMargin = '0px', threshold = 0, triggerOnce = false }: UseInViewOptions,
) => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!targetRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const $entry = entries[0];
        const isIntersecting = $entry.isIntersecting;

        if (isIntersecting) {
          handleIntersect();

          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref: targetRef };
};

export { useInView };
