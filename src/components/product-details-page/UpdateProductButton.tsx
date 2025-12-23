'use client';

import { Theme } from '@emotion/react';
import { Button, SxProps } from '@mui/material';
import { useRouter } from 'next/navigation';

const updateButtonStyles = {
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    border: '1px solid #78cc1d',
    color: '#78cc1d',
    borderRadius: 1,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 0 8px #99E548',
    },
  },
} satisfies Record<string, SxProps<Theme>>;


export const UpdateProductButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const handleClick = () => router.push(`/?next=/products/${id}/update`);
  return (
    <Button sx={updateButtonStyles.button} onClick={handleClick}>
      Update Product
    </Button>
  );
};
