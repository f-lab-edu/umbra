import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/use-in-view';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'> & {
  alt: string;
};

const LazyImage = ({ alt, src, srcSet, className, ...props }: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoad, setIsImageLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

  const handleImageLoad = () => {
    setIsImageLoad(true);
  };
  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {!isImageLoad && !isError && <div className="w-full h-full bg-gray-300 animate-pulse" />}
      {isError && <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">Error</div>}
      <img
        ref={handleSetRef}
        className={`w-full h-full transition-opacity duration-300 ${isImageLoad ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        alt={alt}
        data-src={src}
        data-srcset={srcSet}
        {...props}
      />
    </div>
  );
};

export { LazyImage };
