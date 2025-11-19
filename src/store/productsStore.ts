// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import { createUISlice, UIState } from './slices/uiSlice';
// import { createDataSlice, DataState } from './slices/dataSlice';

// export type ProductsStore = UIState & DataState;

// export const useProductsStore = create<ProductsStore>()(
//   persist(
//     (set, get, store) => ({
//       ...createUISlice(set, get, store),
//       ...createDataSlice(set, get, store),
//     }),
//     {
//       name: 'products-store',
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );






// store/productsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductFilters, defaultFilters } from '@/types/Filters';

export type ViewMode = 'grid' | 'list';

interface ProductsUIStore {
  viewMode: ViewMode;
  isMobileFiltersOpen: boolean;
  currentPage: number;
  userSetFilters: ProductFilters;

  setViewMode: (mode: ViewMode) => void;
  openMobileFilters: () => void;
  closeMobileFilters: () => void;

  setCurrentPage: (page: number) => void;
}

export const useProductsStore = create<ProductsUIStore>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      isMobileFiltersOpen: false,
      currentPage: 1,
      userSetFilters: defaultFilters,

      setViewMode: (mode) => set({ viewMode: mode }),
      openMobileFilters: () => set({ isMobileFiltersOpen: true }),
      closeMobileFilters: () => set({ isMobileFiltersOpen: false }),

      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'products-ui-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
