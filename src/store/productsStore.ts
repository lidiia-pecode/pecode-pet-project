import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UIState, createUISlice } from './slices/uiSlice';
import { DataState, createDataSlice } from './slices/dataSlice';
import { createTableSlice, TableState } from './slices/tableSlice';
import { createUserSlice, UserState } from './slices/userSlice';

export type ProductsStore = UIState & DataState & TableState & UserState;

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get, store) => ({
      ...createUISlice(set, get, store),
      ...createDataSlice(set, get, store),
      ...createTableSlice(set, get, store),
      ...createUserSlice(set, get, store),
    }),
    {
      name: 'products-store',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    }
  )
);

