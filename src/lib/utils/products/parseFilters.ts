import { ProductFilters, defaultFilters} from '@/types/Filters';
import { SortOption, SORT_OPTIONS } from '@/types/Sort';

export interface ParsedQuery {
  page: number;
  filters: ProductFilters;
  sortOption: SortOption;
}

export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): ParsedQuery {
  const page = parseInt(searchParams.get('page') || '1');

  const filters: ProductFilters = {
    price: {
      min: parseFloat(
        searchParams.get('minPrice') || String(defaultFilters.price.min)
      ),
      max: parseFloat(
        searchParams.get('maxPrice') || String(defaultFilters.price.max)
      ),
    },
    rating: {
      min: parseFloat(
        searchParams.get('minRating') || String(defaultFilters.rating.min)
      ),
      max: parseFloat(
        searchParams.get('maxRating') || String(defaultFilters.rating.max)
      ),
    },
    categories: searchParams.getAll('category'),
    searchQuery: searchParams.get('searchQuery') || '',
  };

  const sortOption =
    (searchParams.get('sort') as SortOption) || SORT_OPTIONS.REVIEWS_DESC;

  return {
    page,
    filters,
    sortOption,
  };
}
