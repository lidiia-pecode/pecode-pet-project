'use client';

import { useProductsStore } from '@/store/productsStore';
import { Button } from '@mui/material';
import { styles } from './LogoutButton.styles';

export const LogoutButton = () => {
  const setRole = useProductsStore(state => state.setRole);

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <Button variant='contained' sx={styles.button} onClick={handleLogout}>
      Logout
    </Button>
  );
}
