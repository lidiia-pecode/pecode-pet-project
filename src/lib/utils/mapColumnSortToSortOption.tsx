import { ColumnSort } from '@tanstack/react-table';
import { SORT_OPTIONS, SortOption } from '@/types/Sort';

export function mapColumnSortToSortOption(sort?: ColumnSort | SortOption): SortOption {
  if (!sort) return SORT_OPTIONS.REVIEWS_DESC;

  if (typeof sort === 'string') return sort;

  const map: Record<string, { asc: SortOption; desc: SortOption }> = {
    title: { asc: SORT_OPTIONS.TITLE_ASC, desc: SORT_OPTIONS.TITLE_DESC },
    price: { asc: SORT_OPTIONS.PRICE_ASC, desc: SORT_OPTIONS.PRICE_DESC },
    rating: { asc: SORT_OPTIONS.RATING_ASC, desc: SORT_OPTIONS.RATING_DESC },
    reviews: { asc: SORT_OPTIONS.REVIEWS_ASC, desc: SORT_OPTIONS.REVIEWS_DESC },
    date: { asc: SORT_OPTIONS.DATE_ASC, desc: SORT_OPTIONS.DATE_DESC },
  };

  const conf = map[sort.id];
  if (!conf) return SORT_OPTIONS.REVIEWS_DESC;

  return sort.desc ? conf.desc : conf.asc;
}
