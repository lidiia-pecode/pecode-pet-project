import { PaginatedProducts, Product } from '@/types/Product';
import { api } from './axiosInstanse';
import { API_PRODUCTS_URL } from '../constants';
import { buildProductsQueryParams } from '../utils/buildProductsQueryParams';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/sortOptions';

interface GetAllProductsParams {
  page: number;
  limit: number;
  filters: ProductFilters;
  sort: SortOption;
}

export const getAllProducts = async ({
  page,
  limit,
  filters,
  sort,
}: GetAllProductsParams): Promise<PaginatedProducts> => {
  const params = buildProductsQueryParams({ page, limit, filters, sort });

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
