// app/products/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/utils/getQueryClient';
import { getProducts } from '@/lib/api/products';
import ProductClientWrapper from '@/components/products-page/ProductsClientWrapper/ProductsClientWrapper';

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  // Prefetch з новим API
  await queryClient.prefetchQuery({
    queryKey: ['products', 1],
    queryFn: () => getProducts({ page: 1, limit: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClientWrapper />
    </HydrationBoundary>
  );
}
