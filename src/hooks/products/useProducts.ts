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
import { APIError } from '@/lib/api/fetcher'; // Import APIError

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

type DeleteProductVars = {
  id: number;
  showGlobalAlerts?: boolean;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: ({ id }: DeleteProductVars) => deleteProductById(id),
    onSuccess: (_, { showGlobalAlerts }) => {
      if (showGlobalAlerts !== false) {
        setSuccess(alertMessages.product.delete.success);
      }
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (error, { showGlobalAlerts }) => {
      const errorMessage =
        error instanceof APIError
          ? error.message
          : alertMessages.product.delete.error;
      if (showGlobalAlerts !== false) {
        setError(errorMessage);
      }
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
    onError: error => {
      console.log(error.message);
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

    onError: error => {
      console.log(error.message);
      setError(alertMessages.product.update.error);
    },
  });
};
