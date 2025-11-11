export interface ProductFilters {
  price: [number, number];
  rating: [number, number];
  categories: string[];
}

export type FilterKey = keyof ProductFilters;

export const defaultFilters: ProductFilters = {
  price: [0, 1000],
  rating: [0, 5],
  categories: [],
};

export const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];