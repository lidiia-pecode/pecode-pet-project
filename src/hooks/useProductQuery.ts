'use client';
import { useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseQuery, buildQuery } from '@/lib/utils/productQuery';
import { ProductQuery } from '@/types/Query';

export function useProductQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(() => parseQuery(searchParams), [searchParams]);

  const updateQuery = useCallback(
    (updates: Partial<ProductQuery>) => {
      const newQuery: ProductQuery = { ...query, ...updates };
      const newUrl = `?${buildQuery(newQuery).toString()}`;
      if (newUrl !== `?${searchParams.toString()}`)
        router.push(newUrl, { scroll: false });
    },
    [query, router, searchParams]
  );

  return { query, updateQuery };
}
