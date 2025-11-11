'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Navbar } from '../navigation/Navbar';

export const Header = () => {
  return (
    <AppBar
      position='sticky'
      elevation={2}
      color='transparent'
      sx={{ backdropFilter: 'blur(6px)' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Pecode Store
        </Typography>
        
        <Box>
          <Navbar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
