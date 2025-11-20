import { Product } from '@/types/Product';
import { ProductFilters } from '@/types/Filters';
import { SortOption } from '@/types/Sort';
import { buildQueryString } from '@/lib/utils/buildQueryString';
import { EXTERNAL_API } from '../constants';
import { generateRandomRating } from '../utils/generateRandomRating';

interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface GetProductsParams {
  page: number;
  filters: ProductFilters;
  sortOption: SortOption;
}

export async function getProducts({
  page,
  filters,
  sortOption,
}: GetProductsParams): Promise<PaginatedProductsResponse> {
  const queryString = buildQueryString({ filters, page, sortOption });

  const res = await fetch(`/api/products?${queryString}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: PaginatedProductsResponse = await res.json();
  return { ...data };
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${EXTERNAL_API}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const product = await res.json();

    return {
      ...product,
      rating: generateRandomRating(),
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}
