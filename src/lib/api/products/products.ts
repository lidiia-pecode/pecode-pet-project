import { PaginatedResponse, Product } from '@/types/Product';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/Sort';
import { apiDelete, apiGet, apiPost, apiPut } from '../fetcher';
import { buildQueryString, generateRandomRating } from '@/lib/utils/products';
import { ProductFormData } from '@/types/NewProduct';

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

export async function deleteProductById(id: number) {
  await apiDelete(`/products/${id}`);
}


export async function updateProductById(id: number, data: ProductFormData) {
  await apiPut(`/products/${id}`, data);
}


export async function createProduct(data: ProductFormData) {
  await apiPost(`/products/`, data);
}