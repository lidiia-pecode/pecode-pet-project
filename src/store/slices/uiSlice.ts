import { ViewMode } from '@/types/Product';
import { StateCreator } from 'zustand';

export interface UIState {
  viewMode: ViewMode;
  isMobileFiltersOpen: boolean;
  setViewMode: (mode: ViewMode) => void;
  openMobileFilters: () => void;
  closeMobileFilters: () => void;
}

export const createUISlice: StateCreator<UIState> = set => ({
  viewMode: 'grid',
  isMobileFiltersOpen: false,

  setViewMode: mode => set({ viewMode: mode }),
  openMobileFilters: () => set({ isMobileFiltersOpen: true }),
  closeMobileFilters: () => set({ isMobileFiltersOpen: false }),
});
