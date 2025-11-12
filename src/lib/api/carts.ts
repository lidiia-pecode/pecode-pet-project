// import { Cart } from '@/types/Cart';
// import { buildQueryParams } from '../utils/buildQueryParams';
// import { api } from './axiosInstanse';

// export const getAllCarts = async (params?: {
//   limit?: number;
//   sort?: 'asc' | 'desc';
// }): Promise<Cart[]> => {
//   const res = await api.get<Cart[]>(`/carts${buildQueryParams(params)}`);
//   return res.data;
// };

// export const getCart = async (id: number): Promise<Cart> => {
//   const res = await api.get<Cart>(`/carts/${id}`);
//   return res.data;
// };

// export const createCart = async (payload: Omit<Cart, 'id'>): Promise<Cart> => {
//   const res = await api.post<Cart>('/carts', payload);
//   return res.data;
// };

// export const updateCart = async (
//   id: number,
//   payload: Omit<Cart, 'id'>
// ): Promise<Cart> => {
//   const res = await api.put<Cart>(`/carts/${id}`, payload);
//   return res.data;
// };

// export const deleteCart = async (id: number): Promise<Cart> => {
//   const res = await api.delete<Cart>(`/carts/${id}`);
//   return res.data;
// };
