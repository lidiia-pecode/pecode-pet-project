'use client';
import { create } from 'zustand';
import { Product, ViewMode } from '@/types/Product';

const LOCAL_STORAGE_KEY = 'productViewMode';

interface ProductPageStore {
  viewMode: ViewMode;
  selectedProduct: Product | null;
  setViewMode: (mode: ViewMode) => void;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  initialized: boolean;
  initViewMode: () => void;
}

export const useProductPageStore = create<ProductPageStore>(set => ({
  viewMode: 'grid',
  selectedProduct: null,
  initialized: false,
  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
    if (typeof window !== 'undefined')
      localStorage.setItem(LOCAL_STORAGE_KEY, mode);
  },
  openProduct: (product: Product) => set({ selectedProduct: product }),
  closeProduct: () => set({ selectedProduct: null }),
  initViewMode: () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    set({
      viewMode:
        stored === 'grid' || stored === 'list' ? (stored as ViewMode) : 'grid',
      initialized: true,
    });
  },
}));
