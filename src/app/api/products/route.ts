// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FAKE_STORE_API_URL } from '@/lib/api/api-constants';
import { Product } from '@/types/Product';
import { generateRandomRating } from '@/lib/utils/generateRandomRating';
import { getPreparedProducts } from '@/lib/utils/getPreparedProducts';
import { parseFiltersFromSearchParams } from '@/lib/utils/parseFilters';

const DEFAULT_LIMIT = 6;

export async function GET(request: NextRequest) {
  try {
    const { page, filters, sortOption } = parseFiltersFromSearchParams(
      request.nextUrl.searchParams
    );

    const response = await fetch(`${FAKE_STORE_API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');

    let products: Product[] = await response.json();

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
