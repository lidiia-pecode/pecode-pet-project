import { Product } from '@/types/Product';
import { buildQueryParams } from '../utils/buildQueryParams';
import { api } from './axiosInstanse';

export const getAllProducts = async (params?: {
  limit?: number;
  sort?: 'asc' | 'desc';
}): Promise<Product[]> => {
  const res = await api.get<Product[]>(`/products${buildQueryParams(params)}`);
  return res.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

export const createProduct = async (
  payload: Omit<Product, 'id'>
): Promise<Product> => {
  const res = await api.post<Product>('/products', payload);
  return res.data;
};

export const updateProduct = async (
  id: number,
  payload: Omit<Product, 'id'>
): Promise<Product> => {
  const res = await api.put<Product>(`/products/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const res = await api.delete<Product>(`/products/${id}`);
  return res.data;
};
