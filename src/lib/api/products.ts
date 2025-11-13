import { PaginatedProducts, Product } from '@/types/Product';
import { api } from './axiosInstanse';
import { API_PRODUCTS_URL } from '../constants';
import { ProductFilters, defaultFilters } from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/sortOptions';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import { buildQuery } from '../utils/productQuery';

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
  const productQuery = {
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

  const params = buildQuery(productQuery);

  const res = await fetch(`${API_PRODUCTS_URL}?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

// export const createProduct = async (
//   payload: Omit<Product, 'id'>
// ): Promise<Product> => {
//   const res = await api.post<Product>('/products', payload);
//   return res.data;
// };

// export const updateProduct = async (
//   id: number,
//   payload: Omit<Product, 'id'>
// ): Promise<Product> => {
//   const res = await api.put<Product>(`/products/${id}`, payload);
//   return res.data;
// };

// export const deleteProduct = async (id: number): Promise<Product> => {
//   const res = await api.delete<Product>(`/products/${id}`);
//   return res.data;
// };
