import { CategorySlug } from "./Filters";

export interface PaginatedResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface Category {
  id: number;
  name: string;
  slug: CategorySlug;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface ProductRating {
  rate: number;
  count: number
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
  rating: ProductRating
}

export type ViewMode = 'list' | 'grid';