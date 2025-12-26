import { Category } from '@/types/Categories';
import { apiDelete, apiGet } from '../fetcher';

export async function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/categories');
}

export async function deleteCategory(id: number) {
  await apiDelete(`/categories/${id}`);
}
