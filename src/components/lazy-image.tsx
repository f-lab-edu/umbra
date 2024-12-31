import React, { useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'> & {
  alt: string;
};

const LazyImage = ({ alt, src, srcSet, ...props }: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleIntersectImage = () => {
    const $img = imageRef.current;

    if (!$img) {
      return;
    }

    if ($img.dataset.src) {
      $img.src = $img.dataset.src;
    }

    if ($img.dataset.srcset) {
      $img.srcset = $img.dataset.srcset;
    }
  };

  const { ref } = useInView<HTMLImageElement>(handleIntersectImage, { triggerOnce: true });

  const handleSetRef = ($img: HTMLImageElement | null) => {
    ref.current = $img;
    imageRef.current = $img;
  };

  return <img ref={handleSetRef} alt={alt} data-src={src} data-srcset={srcSet} {...props} />;
};

export { LazyImage };
