import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCategory,
  deleteCategory,
  getCategories,
} from '@/lib/api/products/categories';
import { alertMessages } from '@/lib/utils/constants';
import { useGlobalStore } from '@/store/globalStore';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      setSuccess(alertMessages.category.delete.success);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      setError(alertMessages.category.delete.error);
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setSuccess(alertMessages.category.create.success);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      setError(alertMessages.category.create.error);
    },
  });
};
