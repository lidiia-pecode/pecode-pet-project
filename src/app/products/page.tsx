import {
  queryToFilters,
  parseQuery,
  buildProductsQueryKey,
} from '@/lib/utils/productQuery';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getAllProducts } from '@/lib';
import ProductClientWrapper from '@/components/products/ProductClientWrapper';
import { toUrlSearchParams } from '@/lib/utils/toUrlSearchParams';
import { getQueryClient } from '@/lib/utils/getQueryClient';

interface ProductsPageProps {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedParams = await searchParams;
  if (!resolvedParams) return;

  const urlParams = toUrlSearchParams(resolvedParams);
  const query = parseQuery(urlParams);
  const filters = queryToFilters(query);

  const productsData = await getAllProducts({
    page: query.page,
    limit: query.limit,
    filters,
    sort: query.sort,
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: buildProductsQueryKey(
      query.page,
      query.limit,
      query.sort,
      filters
    ),
    queryFn: () => Promise.resolve(productsData),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClientWrapper initialQuery={query} />
    </HydrationBoundary>
  );
}
