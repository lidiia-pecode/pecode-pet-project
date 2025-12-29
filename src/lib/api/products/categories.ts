import { Category, NewCategoryFormData } from '@/types/Categories';
import { apiDelete, apiGet, apiPost } from '../fetcher';

export async function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/categories');
}

export async function deleteCategory(id: number) {
  await apiDelete(`/categories/${id}`);
}

export async function createCategory(data: NewCategoryFormData) {
  await apiPost('/categories/', data);
}
