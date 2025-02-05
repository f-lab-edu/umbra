import React, { FunctionComponent } from 'react';
import { useStore } from '@/store/store';
import { modalSelector } from '@/store/modal-slice';
import { ModalsEnum } from '@/store/modal-slice';
import { MovieDetailModal } from '@/app/movie/components/movie-detail-modal';

const modalsConfig: Record<ModalsEnum, FunctionComponent<any>> = {
  [ModalsEnum.MovieDetail]: MovieDetailModal,
} as const;

const ModalRenderer = () => {
  const modal = useStore(modalSelector.modalInfo);

  if (modal) {
    const { modalName, props } = modal;
    const Modal = modalsConfig[modalName];

    return <Modal {...props} />;
  }

  return null;
};

export { ModalRenderer, ModalsEnum };
