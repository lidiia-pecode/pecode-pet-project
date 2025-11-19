export const SORT_OPTIONS = {
  POPULAR_DESC: 'popularDesc',
  RATING_DESC: 'ratingDesc',
  PRICE_ASC: 'priceAsc',
  PRICE_DESC: 'priceDesc',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.POPULAR_DESC]: 'Most popular',
  [SORT_OPTIONS.RATING_DESC]: 'Highest rated',
  [SORT_OPTIONS.PRICE_ASC]: 'Price: Low to High',
  [SORT_OPTIONS.PRICE_DESC]: 'Price: High to Low',
};