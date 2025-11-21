import { ViewMode } from '@/types/Product';
import { StateCreator } from 'zustand';

export interface UIState {
  viewMode: ViewMode;
  filtersOpened: boolean;
  setViewMode: (mode: ViewMode) => void;
  openFilters: () => void;
  closeFilters: () => void;
}

export const createUISlice: StateCreator<UIState> = set => ({
  viewMode: 'grid',
  filtersOpened: false,

  setViewMode: mode => set({ viewMode: mode }),
  openFilters: () => set({ filtersOpened: true }),
  closeFilters: () => set({ filtersOpened: false }),
});
