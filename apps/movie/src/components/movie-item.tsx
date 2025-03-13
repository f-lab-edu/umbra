import React from 'react';
import { LazyImage } from './lazy-image';

const MovieItem = ({ imageUrl }: { imageUrl: string; onClick: () => void }) => {
  return (
    <div className="w-full h-full aspect-video rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:brightness-75">
      <LazyImage
        className="w-full h-full"
        alt={'movie'}
        src={`https://image.tmdb.org/t/p/w300/${imageUrl}`}
        srcSet={`https://image.tmdb.org/t/p/w300/${imageUrl} 300w, https://image.tmdb.org/t/p/w780/${imageUrl} 780w, https://image.tmdb.org/t/p/w1280/${imageUrl} 1280w`}
      />
    </div>
  );
};

export { MovieItem };
