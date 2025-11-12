// import {
//   createCart,
//   deleteCart,
//   getAllCarts,
//   getCart,
//   updateCart,
// } from '@/lib';
// import { Cart } from '@/types/Cart';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// export function useCarts() {
//   return useQuery<Cart[]>({
//     queryKey: ['carts'],
//     queryFn: () => getAllCarts(),
//   });
// }

// export function useCart(id: number) {
//   return useQuery<Cart>({
//     queryKey: ['cart', id],
//     queryFn: () => getCart(id),
//     enabled: !!id,
//   });
// }

// export function useCreateCart() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createCart,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['carts'] });
//     },
//   });
// }

// export function useUpdateCart() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, payload }: { id: number; payload: Omit<Cart, 'id'> }) =>
//       updateCart(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['carts'] });
//     },
//   });
// }

// export function useDeleteCart() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: number) => deleteCart(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['carts'] });
//     },
//   });
// }
