export interface ProductFilters {
  price: { min: number; max: number };
  rating: { min: number; max: number };
  categories: CategorySlug[];
  searchQuery?: string;
}
export type FilterKey = keyof ProductFilters;

export const BASE_FILTERS = {
  price: { min: 0, max: 1000 },
  rating: { min: 0, max: 5 },
  categories: [] as CategorySlug[],
  searchQuery: '',
} as const;

export const defaultFilters: ProductFilters = { ...BASE_FILTERS };

export const CATEGORIES = [
  'clothes',
  'furniture',
  'shoes',
  'electronics',
  'miscellaneous',
] as const;

export type CategorySlug = (typeof CATEGORIES)[number];
