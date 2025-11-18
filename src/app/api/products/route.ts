// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FAKE_STORE_API_URL } from '@/lib/api/api-constants';
import { PaginatedResponse, Product } from '@/types/Product';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const response = await fetch(`${FAKE_STORE_API_URL}/products`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const allProducts: Product[] = await response.json();
    const total = allProducts.length;
    const totalPages = Math.ceil(total / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    const result: PaginatedResponse = {
      products: paginatedProducts,
      total,
      totalPages,
      currentPage: page,
      limit,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
