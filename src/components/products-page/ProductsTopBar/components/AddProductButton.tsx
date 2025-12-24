'use client';

import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { addProductButtonStyles } from '../ProductsTopBar.styles';
import { useProductsStore } from '@/store/productsStore';


export const AddProductButton = () => {
  const router = useRouter();
  const handleClick = () => router.push('/products/create');
  const userRole = useProductsStore(state => state.role);

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <Tooltip title='Add Product' arrow>
      <IconButton
        onClick={handleClick}
        sx={addProductButtonStyles.iconButton}
        aria-label='Add Product'
      >
        <AddIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};
