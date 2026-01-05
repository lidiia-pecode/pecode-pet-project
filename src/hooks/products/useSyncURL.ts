'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProductsStore } from '@/store/productsStore';
import { buildQueryString } from '@/lib/utils/products';

export const useSyncURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const filters = useProductsStore(state => state.filters);
  const sortOption = useProductsStore(state => state.sortOption);
  const currentPage = useProductsStore(state => state.currentPage);
  const _hasHydrated = useProductsStore(state => state._hasHydrated);

  useEffect(() => {
    if (!_hasHydrated) return;

    const newQueryString = buildQueryString({
      filters,
      sortOption,
      page: currentPage,
    });

    if (newQueryString !== searchParamsString) {
      router.replace(`${pathname}?${newQueryString}`);
    }
  }, [
    filters,
    sortOption,
    currentPage,
    router,
    pathname,
    searchParamsString,
    _hasHydrated,
  ]);
};
