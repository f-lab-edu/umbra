import { create } from 'zustand';
import { createModalSlice, ModalSlice } from './modal-slice';
import { createUserAccountSlice, UserAccountSlice } from './user-account';

const useStore = create<ModalSlice & UserAccountSlice>()((...store) => ({
  ...createModalSlice(...store),
  ...createUserAccountSlice(...store),
}));

export { useStore };
