import React from 'react';
import { useParams } from 'react-router';
import { useMovieImages } from '../hooks/use-movie-media';

export const MovieGallery = ({ movieId }: { movieId: string }) => {
  const { data: images } = useMovieImages(movieId);

  if (images.backdrops.length === 0) return null;

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">갤러리</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.backdrops.slice(0, 8).map((image) => (
          <div key={image.filePath} className="aspect-video">
            <img
              src={`https://image.tmdb.org/t/p/w500${image.filePath}`}
              alt="Movie still"
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
