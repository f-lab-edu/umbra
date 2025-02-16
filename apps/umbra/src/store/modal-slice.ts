import { StateCreator } from 'zustand';

enum ModalsEnum {
  MovieDetail,
}

interface ModalInfo {
  modalName: ModalsEnum;
  props: any;
}

interface ModalSlice {
  modalInfo: ModalInfo | null;
  setModalInfo: (modalInfo: ModalInfo | null) => void;
}

const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modalInfo: null,
  setModalInfo: (modalInfo: ModalInfo | null) => {
    set({ modalInfo });
  },
});

const modalSelector = {
  modalInfo: (state: ModalSlice) => state.modalInfo,
  setModalInfo: (state: ModalSlice) => state.setModalInfo,
};

export { createModalSlice, modalSelector, ModalsEnum };
export type { ModalSlice };
