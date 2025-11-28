import { PaginatedResponse, Product } from '@/types/Product';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/Sort';
import { buildQueryString } from '@/lib/utils/buildQueryString';
import { generateRandomRating } from '../../utils/generateRandomRating';
import { apiGet } from './fetcher';

interface GetProductsParams {
  page: number;
  filters: ProductFilters;
  sortOption: SortOption;
}

export async function getProducts({
  page,
  filters,
  sortOption,
}: GetProductsParams): Promise<PaginatedResponse> {
  const queryString = buildQueryString({ filters, page, sortOption });

  const res = await fetch(`/api/products?${queryString}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: PaginatedResponse = await res.json();
  return { ...data };
}

export async function getProductById(id: number): Promise<Product> {
  const product = await apiGet<Product>(`/products/${id}`);

  return {
    ...product,
    rating: generateRandomRating(),
  };
}
