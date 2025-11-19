// app/products/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/utils/getQueryClient';
import { getProducts } from '@/lib/api/products';
import ProductClientWrapper from '@/components/products-page/ProductsClientWrapper/ProductsClientWrapper';
import { parseFiltersFromSearchParams } from '@/lib/utils/parseFilters';
import { toUrlSearchParams } from '@/lib/utils/toUrlSearchParams';

interface ProductsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const queryClient = getQueryClient();

  const { page, filters, sortOption } = parseFiltersFromSearchParams(
    toUrlSearchParams(searchParams)
  );

  await queryClient.prefetchQuery({
    queryKey: ['products', page, filters, sortOption],
    queryFn: () => getProducts({ page, filters, sortOption }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClientWrapper />
    </HydrationBoundary>
  );
}
