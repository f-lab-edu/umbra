import { StateCreator } from 'zustand';

interface UserAccount {
  id: number;
  username: string;
}

interface UserAccountSlice {
  userAccountInfo: UserAccount | null;
  setUserAccountInfo: (userAccountInfo: UserAccount | null) => void;
}

const createUserAccountSlice: StateCreator<UserAccountSlice> = (set) => ({
  userAccountInfo: null,
  setUserAccountInfo: (userAccountInfo: UserAccount | null) => {
    set({ userAccountInfo });
  },
});

const userAccountSelector = {
  userAccountInfo: (state: UserAccountSlice) => state.userAccountInfo,
  setUserAccountInfo: (state: UserAccountSlice) => state.setUserAccountInfo,
};

export { createUserAccountSlice, userAccountSelector };
export type { UserAccountSlice };
