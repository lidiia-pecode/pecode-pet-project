'use client';

import { Box, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { styles } from './FormLayout.styles';

interface FormLayoutProps {
  title: string;
  children: ReactNode;
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <Paper
      sx={styles.paper}
    >
      <Typography
        variant='h5'
        sx={styles.title}
      >
        {title}
      </Typography>

      <Box sx={styles.formContainer}>
        {children}
      </Box>
    </Paper>
  );
};
