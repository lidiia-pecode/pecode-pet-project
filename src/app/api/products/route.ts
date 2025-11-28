import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/Product';
import { generateRandomRating } from '@/lib/utils/generateRandomRating';
import { getPreparedProducts } from '@/lib/utils/getPreparedProducts';
import { parseFiltersFromSearchParams } from '@/lib/utils/parseFilters';
import { apiGet } from '@/lib/api/products/fetcher';

const DEFAULT_LIMIT = 6;

export async function GET(request: NextRequest) {
  try {
    const { page, filters, sortOption } = parseFiltersFromSearchParams(
      request.nextUrl.searchParams
    );

    let products = await apiGet<Product[]>('/products');

    products = products.map(product => ({
      ...product,
      rating: generateRandomRating(),
    }));

    const result = getPreparedProducts({
      products,
      filters,
      sortOption,
      page,
      limit: DEFAULT_LIMIT,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
