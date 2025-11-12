import { NextResponse } from 'next/server';
import { api } from '@/lib/api/axiosInstanse';
import { Product } from '@/types/Product';
import { SORT_OPTIONS } from '@/types/sortOptions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const sort = searchParams.get('sort');

  const search = searchParams.get('searchQuery')?.toLowerCase() ?? '';
  const minPrice = Number(searchParams.get('minPrice'));
  const maxPrice = Number(searchParams.get('maxPrice'));
  const minRating = Number(searchParams.get('minRating'));
  const maxRating = Number(searchParams.get('maxRating'));
  const categories = searchParams.getAll('category');


  const res = await api.get<Product[]>('/products');
  const products = res.data;

  const filtered = products.filter(product => {
    const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const inRatingRange =
      product.rating.rate >= minRating && product.rating.rate <= maxRating;
    const inCategory =
      categories.length === 0 || categories.includes(product.category);
    const matchesSearch =
      !search || product.title.toLowerCase().includes(search);

    return inPriceRange && inRatingRange && inCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case SORT_OPTIONS.PRICE_ASC:
        return a.price - b.price;
      case SORT_OPTIONS.PRICE_DESC:
        return b.price - a.price;
      case SORT_OPTIONS.RATING_DESC:
        return b.rating.rate - a.rating.rate;
      case SORT_OPTIONS.POPULAR_DESC:
        return b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = sorted.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: sorted.length,
    page,
    totalPages: Math.ceil(sorted.length / limit),
  });
}
