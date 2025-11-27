
export const SORT_OPTIONS_DROPDOWN = {
  REVIEWS_DESC: 'popularDesc',
  RATING_DESC: 'ratingDesc',
  PRICE_ASC: 'priceAsc',
  PRICE_DESC: 'priceDesc',
} as const;

export const SORT_OPTIONS = {
  NONE: 'none',

  TITLE_ASC: 'titleAsc',
  TITLE_DESC: 'titleDesc',

  PRICE_ASC: 'priceAsc',
  PRICE_DESC: 'priceDesc',

  RATING_ASC: 'ratingAsc',
  RATING_DESC: 'ratingDesc',

  REVIEWS_ASC: 'reviewsAsc',
  REVIEWS_DESC: 'reviewsDesc',

  DATE_ASC: 'dateAsc',
  DATE_DESC: 'dateDesc',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
export type SortOptionDopdown =
  (typeof SORT_OPTIONS_DROPDOWN)[keyof typeof SORT_OPTIONS_DROPDOWN];

export const SORT_LABELS: Record<SortOptionDopdown, string> = {
  [SORT_OPTIONS_DROPDOWN.REVIEWS_DESC]: 'Most popular',
  [SORT_OPTIONS_DROPDOWN.RATING_DESC]: 'Highest rated',
  [SORT_OPTIONS_DROPDOWN.PRICE_ASC]: 'Price: Low to High',
  [SORT_OPTIONS_DROPDOWN.PRICE_DESC]: 'Price: High to Low',
};
