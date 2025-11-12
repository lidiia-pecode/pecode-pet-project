import { getAllProducts, getProduct } from '@/lib';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { PaginatedProducts, Product } from '@/types/Product';
import { useQuery } from '@tanstack/react-query';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/sortOptions';

interface UseProductsParams {
  page?: number;
  limit?: number;
  filters: ProductFilters;
  sort: SortOption;
}

export function useProducts({
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  filters,
  sort,
}: UseProductsParams) {
  return useQuery<PaginatedProducts>({
    queryKey: ['products', page, limit, filters, sort],
    queryFn: () =>
      getAllProducts({
        page,
        limit,
        filters,
        sort,
      }),
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}
