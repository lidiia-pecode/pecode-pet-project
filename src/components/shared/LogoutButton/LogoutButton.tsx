'use client';

import { Button } from '@mui/material';

import { styles } from './LogoutButton.styles';
import { useGlobalStore } from '@/store/globalStore';
import { useProductsStore } from '@/store/productsStore';

export const LogoutButton = () => {
  const setUser = useGlobalStore(state => state.setUser);
  const clearCart = useProductsStore(state => state.clearCart);

  const handleLogout = () => {
    setUser(null);
    clearCart();
  };

  return (
    <Button variant='contained' sx={styles.button} onClick={handleLogout}>
      Logout
    </Button>
  );
};
