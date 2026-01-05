import { StateCreator } from 'zustand';
import {
  ProductFilters,
  defaultFilters,
  BASE_FILTERS,
  FilterKey,
} from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/Sort';

export interface DataState {
  filters: ProductFilters;
  currentPage: number;
  sortOption: SortOption;

  updateFilters: (changed: Partial<ProductFilters>) => void;
  removeFilter: (key: FilterKey, value: string) => void;
  clearFilters: () => void;

  syncCategories: (existingSlugs: string[]) => void;
  setSortOption: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}

function filtersChanged(a: ProductFilters, b: ProductFilters) {
  return (
    a.price.min !== b.price.min ||
    a.price.max !== b.price.max ||
    a.rating.min !== b.rating.min ||
    a.rating.max !== b.rating.max ||
    a.searchQuery !== b.searchQuery ||
    a.categories.length !== b.categories.length ||
    a.categories.some(c => !b.categories.includes(c))
  );
}

export const createDataSlice: StateCreator<DataState> = (set, get) => {
  return {
    filters: defaultFilters,
    currentPage: 1,
    sortOption: SORT_OPTIONS.REVIEWS_DESC,

    updateFilters: changed => {
      const { filters, currentPage } = get();
      const merged = { ...filters, ...changed };
      const shouldResetPage = filtersChanged(filters, merged);

      set({ filters: merged, currentPage: shouldResetPage ? 1 : currentPage });
    },

    removeFilter: (key: FilterKey, value?: string) => {
      const updated = { ...get().filters };

      switch (key) {
        case 'price':
          updated.price = BASE_FILTERS.price;
          break;
        case 'rating':
          updated.rating = BASE_FILTERS.rating;
          break;
        case 'categories':
          if (value) {
            updated.categories = updated.categories.filter(c => c !== value);
          } else {
            updated.categories = [];
          }
          break;
        default:
          break;
      }

      get().updateFilters(updated);
    },

    clearFilters: () => get().updateFilters(defaultFilters),

    syncCategories: (existingSlugs: string[]) => {
      const { filters } = get();
      const validCategories = filters.categories.filter(c =>
        existingSlugs.includes(c)
      );

      if (validCategories.length !== filters.categories.length) {
        set({
          filters: { ...filters, categories: validCategories },
        });
      }
    },

    setSortOption: option => {
      const { sortOption, currentPage } = get();
      const shouldResetPage = sortOption !== option;

      set({
        sortOption: option,
        currentPage: shouldResetPage ? 1 : currentPage,
      });
    },

    setSearchQuery: query => get().updateFilters({ searchQuery: query }),

    setPage: page => {
      set({ currentPage: page });
    },
  };
};
