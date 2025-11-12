import { NextResponse } from 'next/server';
import { api } from '@/lib/api/axiosInstanse';
import { Product } from '@/types/Product';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || PRODUCTS_PER_PAGE;

  const res = await api.get<Product[]>('/products');
  const products = res.data;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = products.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: products.length,
    page,
    totalPages: Math.ceil(products.length / limit),
  });
}
