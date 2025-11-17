import { getAllProducts } from '@/lib';
import { buildProductsQueryKey } from '@/lib/utils/productQuery';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/sortOptions';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface UseProductsParams {
  page: number;
  limit: number;
  filters: ProductFilters;
  sort: SortOption;
}

export function useProducts({ page, limit, filters, sort }: UseProductsParams) {
  return useQuery({
    queryKey: buildProductsQueryKey(page, limit, sort, filters),
    queryFn: () => getAllProducts({ page, limit, filters, sort }),
    placeholderData: keepPreviousData,
    select: res => ({
      products: res.data,
      totalPages: res.totalPages,
    }),
    staleTime: 60_000,
  });
}
