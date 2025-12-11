import { Category } from '@/types/Categories';
import { apiGet } from '../fetcher';

export async function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/categories');
}
