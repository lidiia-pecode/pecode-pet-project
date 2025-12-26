import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/utils/getQueryClient';
import { getProducts } from '@/lib/api/products/products';
import { parseFiltersFromSearchParams } from '@/lib/utils/parseFilters';
import { toUrlSearchParams } from '@/lib/utils/toUrlSearchParams';

import { ProductsOverview } from '@/components/products-page';

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
