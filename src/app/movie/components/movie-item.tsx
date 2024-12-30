import React from 'react';

// TODO: 임시 UI 확인용
const MovieItem = () => {
  return (
    <div className="rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:brightness-75">
      <img
        className="w-full"
        alt={'movie'}
        src={'https://image.tmdb.org/t/p/w300/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg'}
        srcSet={
          'https://image.tmdb.org/t/p/w300/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg 300w, https://image.tmdb.org/t/p/w780/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg 780w, https://image.tmdb.org/t/p/w1280/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg 1280w'
        }
      />
    </div>
  );
};

export { MovieItem };
