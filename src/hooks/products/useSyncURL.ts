'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProductsStore } from '@/store/productsStore';
import { buildQueryString } from '@/lib/utils/products';

export const useSyncURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useProductsStore(state => ({
    filters: state.filters,
    sortOption: state.sortOption,
    currentPage: state.currentPage,
    _hasHydrated: state._hasHydrated,
  }));

  const { filters, sortOption, currentPage, _hasHydrated } = state;

  useEffect(() => {
    if (!_hasHydrated) {
      return;
    }

    const newQueryString = buildQueryString({
      filters,
      sortOption,
      page: currentPage,
    });

    if (newQueryString !== searchParams.toString()) {
      router.replace(`${pathname}?${newQueryString}`);
    }
  }, [
    filters,
    sortOption,
    currentPage,
    router,
    pathname,
    searchParams,
    _hasHydrated,
  ]);
};
