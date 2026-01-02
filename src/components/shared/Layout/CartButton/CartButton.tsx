'use client';

import { useState } from 'react';
import { IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { styles } from './CartButton.styles';
import { useProductsStore } from '@/store/productsStore';
import { CartDrawer } from '../CartDrawer';

export const CartButton = () => {
  const cart = useProductsStore(s => s.cart);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  return (
    <Box>
      <IconButton onClick={toggleDrawer} sx={styles.button}>
        <Badge badgeContent={cart.length} >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <CartDrawer open={open} onClose={toggleDrawer} />
    </Box>
  );
};
