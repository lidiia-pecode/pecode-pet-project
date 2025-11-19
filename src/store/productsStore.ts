import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UIState, createUISlice } from './slices/uiSlice';
import { DataState, createDataSlice } from './slices/dataSlice';

export type ProductsStore = UIState & DataState;

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get, store) => ({
      ...createUISlice(set, get, store),
      ...createDataSlice(set, get, store),
    }),
    {
      name: 'products-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
