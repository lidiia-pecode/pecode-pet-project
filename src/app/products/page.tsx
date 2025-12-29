import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getProducts } from '@/lib/api/products/products';
import { getQueryClient } from '@/lib/utils';

import { ProductsOverview } from '@/components/products-page';
import {
  parseFiltersFromSearchParams,
  toUrlSearchParams,
} from '@/lib/utils/products';

interface ProductsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const queryClient = getQueryClient();
  const awaited =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const params = toUrlSearchParams(awaited);

  const { page, filters, sortOption } = parseFiltersFromSearchParams(params);

  await queryClient.prefetchQuery({
    queryKey: ['products', page, filters, sortOption],
    queryFn: () => getProducts({ page, filters, sortOption }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsOverview />
    </HydrationBoundary>
  );
}
