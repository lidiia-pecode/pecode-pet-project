'use client';

import { Box, Typography } from '@mui/material';

import { styles } from './HomePage.styles';
import { AuthForm } from './components/AuthForm';
import { LogoutButton } from '../shared/LogoutButton';
import { useGlobalStore } from '@/store/globalStore';

export const HomePage = () => {
  const user = useGlobalStore(state => state.user);

  return (
    <Box sx={styles.container}>
      {user ? (
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
