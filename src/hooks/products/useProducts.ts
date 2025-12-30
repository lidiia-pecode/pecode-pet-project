import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from '@/lib/api/products';
import { mapColumnSortToSortOption } from '@/lib/utils/products';
import { alertMessages } from '@/lib/utils/constants';
import { ProductFormData } from '@/types/NewProduct';
import { useProductsStore } from '@/store/productsStore';
import { useGlobalStore } from '@/store/globalStore';

export const useProducts = (sorting?: SortingState) => {
  const currentPage = useProductsStore(state => state.currentPage);
  const filters = useProductsStore(state => state.filters);
  const sortOption = useProductsStore(state => state.sortOption);

  const rawSort = sorting && sorting.length > 0 ? sorting[0] : sortOption;
  const effectiveSort = mapColumnSortToSortOption(rawSort);

  return useQuery({
    queryKey: ['products', currentPage, filters, effectiveSort],
    queryFn: () =>
      getProducts({ page: currentPage, filters, sortOption: effectiveSort }),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: (id: number) => deleteProductById(id),
    onSuccess: () => {
      setSuccess(alertMessages.product.delete.success);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: () => {
      setError(alertMessages.product.delete.error);
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setSuccess(alertMessages.product.create.success);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      setError(alertMessages.product.create.error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & ProductFormData) =>
      updateProductById(id, data),

    onSuccess: () => {
      setSuccess(alertMessages.product.update.success);

      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: () => {
      setError(alertMessages.product.update.error);
    },
  });
};
