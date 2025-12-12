'use client';

import { apiPost } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';
import { Box } from '@mui/material';

export const NewCategoryForm = () => {
  const alert = useAlert();
  const onSubmit = async (data: unknown) => {
    try {
      await apiPost('/categories/', data);
      alert.success('Category added successfully!');
    } catch (err) {
      console.error(err);
      alert.error('Failed to add category.');
    }
  };

  return (
    <Box sx={{ flex: 1, height: 300, backgroundColor: 'grey.100' }}>
      CategoryForm
    </Box>
  );
};
