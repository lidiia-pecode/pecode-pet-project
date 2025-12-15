'use client';

import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { addProductButtonStyles } from '../ProductsTopBar.styles';


export const AddProductButton = () => {
  const router = useRouter();
  const handleClick = () => router.push('/?next=/products/create');;

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
