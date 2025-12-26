import { StateCreator } from 'zustand';

export interface UserState {
  role: 'customer' | 'admin' | null;
  setRole: (role: 'customer' | 'admin' | null) => void;
}

export const createUserSlice: StateCreator<UserState> = set => ({
  role: null,

  setRole: role => set({ role }),
});
