import React, { Suspense } from 'react';
import { useParams } from 'react-router';
import { MovieHero } from './components/movie-hero';

import { MovieCast } from './components/movie-cast';
import { MovieTrailer } from './components/movie-trailer';
import { MovieGallery } from './components/movie-gallery';
import { MovieList } from './components/movie-list';
import { MovieSidebar } from './components/movie-sidebar';
import { ReviewSection } from './components/review-section';
import { MovieOverview } from './components/movie-overview';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
  </div>
);

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>해당 영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<LoadingSpinner />}>
        <MovieHero movieId={id} />
      </Suspense>

      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Suspense fallback={<LoadingSpinner />}>
              <MovieOverview movieId={id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieCast movieId={id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieTrailer movieId={id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <ReviewSection movieId={id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieGallery movieId={id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieList movieId={id} title="비슷한 영화" type="similar" />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieList movieId={id} title="추천 영화" type="recommendations" />
            </Suspense>
          </div>

          <div className="col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <MovieSidebar movieId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieDetailPage };
