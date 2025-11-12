export interface ProductFilters {
  price: { min: number; max: number };
  rating: { min: number; max: number };
  categories: string[];
  searchQuery?: string;
}

export type FilterKey = keyof ProductFilters;

export const defaultFilters: ProductFilters = {
  price: { min: 0, max: 1000 },
  rating: { min: 0, max: 5 },
  categories: [],
  searchQuery: '',
};

export const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];
