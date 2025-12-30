import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createUserSlice, UserState } from './slices/userSlice';
import { AlertState, createAlertSlice } from './slices/alertSlice';

export type GlobalStore = UserState & AlertState;

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get, store) => ({
      ...createUserSlice(set, get, store),
      ...createAlertSlice(set, get, store),
    }),
    {
      name: 'global-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

