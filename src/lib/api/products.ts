// lib/api/products.ts
import { Product } from '@/types/Product';

interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface GetProductsParams {
  page: number;
  limit: number;
}

export async function getProducts(
  params: GetProductsParams
): Promise<PaginatedProductsResponse> {
  const { page, limit } = params;

  const res = await fetch(`/api/products?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}
