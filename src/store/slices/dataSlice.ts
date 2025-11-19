import { FilterKey, ProductFilters, defaultFilters } from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/Sort';
import { StateCreator } from 'zustand';

export interface DataState {
  filters: ProductFilters;
  sortOption: SortOption;
  currentPage: number;
  limit: number;
  // setFilters: (filters: ProductFilters) => void;
  setSortOption: (option: SortOption) => void;
  setCurrentPage: (page: number) => void;
  updateFilters: (updated: Partial<ProductFilters>) => void;
  removeFilter: (key: FilterKey) => void;
  resetFilters: () => void;
}

export const createDataSlice: StateCreator<DataState> = (set, get, store) => ({
  filters: defaultFilters,
  sortOption: SORT_OPTIONS.POPULAR_DESC,
  currentPage: 1,
  limit: 6,
  // setFilters: (filters: ProductFilters) => set({ filters, currentPage: 1 }),
  setSortOption: (sortOption: SortOption) =>
    set({ sortOption, currentPage: 1 }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  updateFilters: (updated: Partial<ProductFilters>) =>
    set({ filters: { ...get().filters, ...updated }, currentPage: 1 }),
  removeFilter: (key: FilterKey) => {
    const filters = { ...get().filters };
    switch (key) {
      case 'price':
        filters.price = defaultFilters.price;
        break;
      case 'rating':
        filters.rating = defaultFilters.rating;
        break;
      case 'categories':
        filters.categories = defaultFilters.categories;
        break;
    }
    set({ filters, currentPage: 1 });
  },
  resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),
});
