import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface MovieDetailModalProps {
  closeModal: () => void;
}

const MovieDetailModal = ({ closeModal }: MovieDetailModalProps) => {
  return (
    <Dialog className="relative z-[100]" open={true} onClose={closeModal}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel>
          <div className="w-[800px] h-[800px] bg-white rounded-xl overflow-hidden">{/* TODO: 영화 상세 정보 */}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export { MovieDetailModal };
export type { MovieDetailModalProps };
