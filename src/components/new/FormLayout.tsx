'use client';

import { Box, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  children: ReactNode;
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        flex: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        maxWidth: 800,
        position: 'relative',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          mb: 5,
          mt: {
            xs: 1,
            sm: 0
          },
          fontSize: {
            xs: '18px', 
            sm: '24px', 
            md: '32px',
          },
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {children}
      </Box>
    </Paper>
  );
};
