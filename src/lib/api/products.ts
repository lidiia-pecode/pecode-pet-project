import { PaginatedProducts } from '@/types/Product';
import { ProductFilters, defaultFilters } from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/sortOptions';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { buildQuery } from '../utils/productQuery';
import { internalApi } from './axiosInstanse';

interface GetAllProductsParams {
  page?: number;
  limit?: number;
  filters?: ProductFilters;
  sort?: SortOption;
}

export const getAllProducts = async ({
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  filters = defaultFilters,
  sort = SORT_OPTIONS.POPULAR_DESC,
}: GetAllProductsParams): Promise<PaginatedProducts> => {
  const queryObj = {
    page,
    limit,
    sort,
    minPrice: filters.price.min,
    maxPrice: filters.price.max,
    minRating: filters.rating.min,
    maxRating: filters.rating.max,
    categories: filters.categories,
    searchQuery: filters.searchQuery || '',
  };

  const queryString = buildQuery(queryObj);

  const res = await internalApi.get<PaginatedProducts>(
    `/api/products?${queryString}`
  );
  return res.data;
};
