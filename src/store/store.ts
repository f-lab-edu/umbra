import { create } from 'zustand';
import { createModalSlice, ModalSlice } from '@/store/modal-slice';

const useStore = create<ModalSlice>()((...store) => ({
  ...createModalSlice(...store),
}));

export { useStore };
