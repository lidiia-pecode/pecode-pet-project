import { getProducts } from '@/lib';
import { mapColumnSortToSortOption } from '@/lib/utils/mapColumnSortToSortOption';
import { useProductsStore } from '@/store/productsStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

export const useProducts = (sorting?: SortingState) => {
  const currentPage = useProductsStore(state => state.currentPage);
  const filters = useProductsStore(state => state.filters);
  const sortOption = useProductsStore(state => state.sortOption);

  const rawSort = sorting && sorting.length > 0 ? sorting[0] : sortOption;
  const effectiveSort = mapColumnSortToSortOption(rawSort);

  return useQuery({
    queryKey: ['products', currentPage, filters, effectiveSort],
    queryFn: () =>
      getProducts({ page: currentPage, filters, sortOption: effectiveSort }),
    placeholderData: keepPreviousData,
  });
};
