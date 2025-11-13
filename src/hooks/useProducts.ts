import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllProducts, getProduct } from '@/lib';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { PaginatedProducts, Product } from '@/types/Product';
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
  const { categories, price, rating, searchQuery } = filters;

  return useQuery<PaginatedProducts>({
    queryKey: [
      'products',
      page,
      limit,
      sort,
      searchQuery,
      price.min,
      price.max,
      rating.min,
      rating.max,
      categories.join(','),
    ],
    queryFn: () => getAllProducts({ page, limit, filters, sort }),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}
