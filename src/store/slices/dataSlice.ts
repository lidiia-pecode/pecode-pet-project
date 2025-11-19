import { StateCreator } from 'zustand';
import {
  ProductFilters,
  defaultFilters,
  BASE_FILTERS,
  FilterKey,
} from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/Sort';
import { buildQueryString } from '@/lib/utils/buildQueryString';

export interface DataState {
  filters: ProductFilters;
  currentPage: number;
  sortOption: SortOption;

  updateFilters: (changed: Partial<ProductFilters>) => void;
  removeFilter: (key: FilterKey) => void;
  clearFilters: () => void;

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
  const updateURL = () => {
    const { filters, sortOption, currentPage } = get();
    const url = buildQueryString({ filters, sortOption, page: currentPage });
    window.history.replaceState(null, '', `?${url}`);
  };

  return {
    filters: defaultFilters,
    currentPage: 1,
    sortOption: SORT_OPTIONS.POPULAR_DESC,

    updateFilters: changed => {
      const { filters, currentPage } = get();
      const merged = { ...filters, ...changed };
      const shouldResetPage = filtersChanged(filters, merged);

      set({ filters: merged, currentPage: shouldResetPage ? 1 : currentPage });
      updateURL();
    },

    removeFilter: key => {
      const updated = { ...get().filters };
      switch (key) {
        case 'price':
          updated.price = BASE_FILTERS.price;
          break;
        case 'rating':
          updated.rating = BASE_FILTERS.rating;
          break;
        case 'categories':
          updated.categories = [];
          break;
        case 'searchQuery':
          updated.searchQuery = '';
          break;
      }
      get().updateFilters(updated);
    },

    clearFilters: () => get().updateFilters(defaultFilters),

    setSortOption: option => {
      const { sortOption, currentPage } = get();
      const shouldResetPage = sortOption !== option;

      set({
        sortOption: option,
        currentPage: shouldResetPage ? 1 : currentPage,
      });
      updateURL();
    },

    setSearchQuery: query => get().updateFilters({ searchQuery: query }),

    setPage: page => {
      set({ currentPage: page });
      updateURL();
    },
  };
};
