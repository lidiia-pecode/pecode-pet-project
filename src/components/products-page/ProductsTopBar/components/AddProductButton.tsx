'use client';

import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';


export const AddProductButton = () => {
  const router = useRouter();

  const handleClick = () => router.push('/products/new');

  return (
    <Tooltip title='Add Product' arrow>
      <IconButton
        onClick={handleClick}
        sx={{
          border: '1px solid #78cc1d',
          color: '#78cc1d',
          borderRadius: 1,
          mr: { sm: 2 },
          '&:hover': {
            backgroundColor: '#fff',
            boxShadow: '0 0 8px #99E548',
          },
        }}
        aria-label='Add Product'
      >
        <AddIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};
