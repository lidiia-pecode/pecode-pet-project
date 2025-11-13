export interface ProductFilters {
  price: { min: number; max: number };
  rating: { min: number; max: number };
  categories: Category[];
  searchQuery?: string;
}

export type FilterKey = keyof ProductFilters;

export const BASE_FILTERS = {
  price: { min: 0, max: 1000 },
  rating: { min: 0, max: 5 },
  categories: [] as Category[],
  searchQuery: '',
} as const;

export const defaultFilters: ProductFilters = { ...BASE_FILTERS };

export const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
] as const;

export type Category = (typeof CATEGORIES)[number];
