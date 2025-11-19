import { Category } from '@/types/Product';
import { apiGet } from './fetcher';

export async function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/categories');
}

export async function getCategoryById(id: number): Promise<Category> {
  return apiGet<Category>(`/categories/${id}`);
}
