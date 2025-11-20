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

export interface IProductRating {
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
  rating: IProductRating
}

export type ViewMode = 'list' | 'grid';