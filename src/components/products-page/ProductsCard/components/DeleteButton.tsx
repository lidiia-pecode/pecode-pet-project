'use client';

import { deleteProductById } from '@/lib';
import { Delete } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { MouseEvent } from 'react';
import { cardStyles } from '../ProductsCard.styles';

interface DeleteProductButtonProps {
  id: number;
  refetch: () => void;
}

export const DeleteProductButton = ({ id, refetch }: DeleteProductButtonProps) => {
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await deleteProductById(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={cardStyles.deleteButtonWrapper}>
      <IconButton onClick={handleDelete} aria-label='Delete Product'>
        <Delete sx={cardStyles.deleteIcon} />
      </IconButton>
    </Box>
  );
};
