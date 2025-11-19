import { Product } from '@/types/Product';
import { SORT_OPTIONS, SortOption } from '@/types/Sort';
import { ProductFilters } from '@/types/Filters';

interface PrepareProductsParams {
  products: Product[];
  filters: ProductFilters;
  sortOption: SortOption;
  page: number;
  limit: number;
}

function filterProducts(products: Product[], filters: ProductFilters) {
  return products.filter(product => {
    const matchesPrice =
      product.price >= filters.price.min && product.price <= filters.price.max;

    const matchesRating =
      product.rating.rate >= filters.rating.min &&
      product.rating.rate <= filters.rating.max;

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category.slug);

    const matchesSearch =
      !filters.searchQuery ||
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesPrice && matchesRating && matchesCategory && matchesSearch;
  });
}

function sortProducts(products: Product[], sortOption: SortOption) {
  return [...products].sort((a, b) => {
    switch (sortOption) {
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

export function getPreparedProducts({
  products,
  filters,
  sortOption,
  page,
  limit,
}: PrepareProductsParams) {
  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, sortOption);
  const paginated = paginateProducts(sorted, page, limit);

  return {
    products: paginated,
    total: sorted.length,
    page,
    totalPages: Math.ceil(sorted.length / limit),
  };
}
