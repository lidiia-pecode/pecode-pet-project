'use client';

import { Button } from '@mui/material';
import { styles } from './LogoutButton.styles';
import { useGlobalStore } from '@/store/globalStore';

export const LogoutButton = () => {
  const setUser = useGlobalStore(state => state.setUser);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Button variant='contained' sx={styles.button} onClick={handleLogout}>
      Logout
    </Button>
  );
}
