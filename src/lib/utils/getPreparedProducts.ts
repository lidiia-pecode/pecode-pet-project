import { Product } from '@/types/Product';
import { ProductQuery } from '@/types/Query';
import { SORT_OPTIONS } from '@/types/sortOptions';
import { Category } from '@/types/Filters';

function filterProducts(products: Product[], query: ProductQuery): Product[] {
  return products.filter(product => {
    const matchesPrice =
      product.price >= query.minPrice && product.price <= query.maxPrice;

    const matchesRating =
      product.rating.rate >= query.minRating &&
      product.rating.rate <= query.maxRating;

    const matchesCategory =
      query.categories.length === 0 ||
      query.categories.includes(product.category as Category);

    const matchesSearch =
      !query.searchQuery ||
      product.title.toLowerCase().includes(query.searchQuery.toLowerCase());

    return matchesPrice && matchesRating && matchesCategory && matchesSearch;
  });
}

function sortProducts(
  products: Product[],
  sort: ProductQuery['sort']
): Product[] {
  return [...products].sort((a, b) => {
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
}

function paginateProducts(products: Product[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return products.slice(start, start + limit);
}

export function getPreparedProducts(products: Product[], query: ProductQuery) {
  const filtered = filterProducts(products, query);
  const sorted = sortProducts(filtered, query.sort);
  const paginated = paginateProducts(sorted, query.page, query.limit);

  return {
    data: paginated,
    total: sorted.length,
    page: query.page,
    totalPages: Math.ceil(sorted.length / query.limit),
  };
}
