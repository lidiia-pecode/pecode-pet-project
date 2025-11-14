'use client';
import { useEffect } from 'react';
import { useProductPageStore } from '@/store/useProductPageStore';

export const useInitViewMode = () => {
  const initViewMode = useProductPageStore(state => state.initViewMode);

  useEffect(() => {
    initViewMode();
  }, [initViewMode]);

  const viewMode = useProductPageStore(state => state.viewMode);
  return viewMode;
};
