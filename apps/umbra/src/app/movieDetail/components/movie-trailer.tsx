import React from 'react';
import { useParams } from 'react-router';
import { useMovieVideos } from '../hooks/use-movie-media';

export const MovieTrailer = ({ movieId }: { movieId: string }) => {
  const { data: videos } = useMovieVideos(movieId);

  const trailer = videos.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');

  if (!trailer) return null;

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">예고편</h2>
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};
