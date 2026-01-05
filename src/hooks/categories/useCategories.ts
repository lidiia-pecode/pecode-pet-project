import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCategory,
  deleteCategory,
  getCategories,
} from '@/lib/api/products/categories';
import { alertMessages } from '@/lib/utils/constants';
import { useGlobalStore } from '@/store/globalStore';
import { APIError } from '@/lib/api/fetcher';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });
};

type DeleteCategoryVars = {
  id: number;
  showGlobalAlerts?: boolean;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const setError = useGlobalStore(state => state.setError);

  return useMutation({
    mutationFn: ({ id }: DeleteCategoryVars) => deleteCategory(id),
    onSuccess: (_, { showGlobalAlerts }) => {
      if (showGlobalAlerts !== false) {
        setSuccess(alertMessages.category.delete.success);
      }
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error, { showGlobalAlerts }) => {
      const errorMessage =
        error instanceof APIError ? error.message : alertMessages.category.delete.error;
      if (showGlobalAlerts !== false) {
        setError(errorMessage);
      }
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
    onError: error => {
      const errorMessage =
        error instanceof APIError ? error.message : alertMessages.category.create.error;
      setError(errorMessage);
    },
  });
};
