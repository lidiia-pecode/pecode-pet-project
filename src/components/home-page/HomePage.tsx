'use client';

import { Box, Typography } from '@mui/material';

import { styles } from './HomePage.styles';

import { AuthForm } from './components/AuthForm';
import { LogoutButton } from './components/LogoutButton';
import { useProductsStore } from '@/store/productsStore';

export const HomePage = () => {
  const userRole = useProductsStore(state => state.role);

  return (
    <Box sx={styles.container}>
      {userRole ? (
        <>
          <Typography variant='h1' sx={styles.title}>
            Welcome to Pecode Pet Project
          </Typography>

          <LogoutButton />
        </>
      ) : (
        <AuthForm />
      )}
    </Box>
  );
};
