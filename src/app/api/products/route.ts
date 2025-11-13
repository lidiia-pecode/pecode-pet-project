import { api } from '@/lib/api/axiosInstanse';
import { getPreparedProducts } from '@/lib/utils/getPreparedProducts';
import { parseQuery } from '@/lib/utils/productQuery';
import { Product } from '@/types/Product';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = parseQuery(searchParams);

  const res = await api.get<Product[]>('/products');
  const products = res.data;

  const prepared = getPreparedProducts(products, query);

  return NextResponse.json(prepared);
}
