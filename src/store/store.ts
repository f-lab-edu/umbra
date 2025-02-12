import { create } from 'zustand';
import { createModalSlice, ModalSlice } from '@/store/modal-slice';
import { createUserAccountSlice, UserAccountSlice } from '@/store/user-account';

const useStore = create<ModalSlice & UserAccountSlice>()((...store) => ({
  ...createModalSlice(...store),
  ...createUserAccountSlice(...store),
}));

export { useStore };
