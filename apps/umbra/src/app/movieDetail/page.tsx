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
import { ErrorBoundary } from '@/components/error-boundary';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex items-center justify-center min-h-[200px] bg-red-50 rounded-lg p-4">
    <div className="text-red-600">
      <p className="font-semibold">오류가 발생했습니다</p>
      <p className="text-sm mt-1">{error.message}</p>
    </div>
  </div>
);

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>해당 영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ErrorBoundary fallback={<ErrorFallback error={new Error('영화 정보를 불러오는데 실패했습니다.')} />}>
        <Suspense fallback={<LoadingSpinner />}>
          <MovieHero movieId={id} />
        </Suspense>
      </ErrorBoundary>

      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <ErrorBoundary fallback={<ErrorFallback error={new Error('영화 개요를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieOverview movieId={id} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('출연진 정보를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieCast movieId={id} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('예고편을 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieTrailer movieId={id} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('리뷰를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <ReviewSection movieId={id} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('갤러리를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieGallery movieId={id} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('비슷한 영화를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieList movieId={id} title="비슷한 영화" type="similar" />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<ErrorFallback error={new Error('추천 영화를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieList movieId={id} title="추천 영화" type="recommendations" />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="col-span-1">
            <ErrorBoundary fallback={<ErrorFallback error={new Error('영화 상세 정보를 불러오는데 실패했습니다.')} />}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieSidebar movieId={id} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieDetailPage };
