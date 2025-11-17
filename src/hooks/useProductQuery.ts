'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseQuery, buildQuery } from '@/lib/utils/productQuery';
import { ProductQuery } from '@/types/Query';

export function useProductQuery(initialQuery?: ProductQuery) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clientQuery, setClientQuery] = useState<ProductQuery>(
    initialQuery ?? parseQuery(searchParams)
  );

  const updateQuery = useCallback(
    (updates: Partial<ProductQuery>) => {
      const newQuery: ProductQuery = { ...clientQuery, ...updates };
      setClientQuery(newQuery);

      const newUrl = `?${buildQuery(newQuery)}`;
      if (newUrl !== `?${searchParams.toString()}`)
        router.push(newUrl, { scroll: false });
    },
    [clientQuery, router, searchParams]
  );

  return { query: clientQuery, updateQuery };
}
