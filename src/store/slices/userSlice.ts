import { StateCreator } from 'zustand';
import { User } from '@/types/User';

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<UserState> = set => ({
  user: null,

  setUser: user => set({ user }),
});
