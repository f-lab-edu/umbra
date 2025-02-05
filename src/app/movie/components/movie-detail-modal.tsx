import React, { Suspense } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MovieDetailContent } from '@/app/movie/components/movie-detail-content';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorFallback } from '@/components/error-fallback';
import { useQueryClient } from '@tanstack/react-query';

interface MovieDetailModalProps {
  movieId: number;
  closeModal: () => void;
}

const MovieDetailModal = ({ closeModal, movieId }: MovieDetailModalProps) => {
  const queryClient = useQueryClient();

  const handleErrorRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['getMovieDetails', movieId], refetchType: 'all' });
  };

  return (
    <Dialog className="relative z-[100]" open={true} onClose={closeModal}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel>
          <div className="w-[800px] h-[800px] bg-white rounded-xl overflow-hidden">
            <ErrorBoundary fallback={<ErrorFallback onRetry={handleErrorRetry} />}>
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailContent movieId={movieId} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export { MovieDetailModal };
export type { MovieDetailModalProps };
