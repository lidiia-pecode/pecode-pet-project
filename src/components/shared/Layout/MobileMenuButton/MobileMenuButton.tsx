'use client';

import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { styles } from './MobileMenuButton.styles';
import { MobileMenu } from '../MobileMenu';



export const MobileMenuButton = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <Box sx={styles.buttonWrapper}>
      <IconButton color='inherit' onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <MobileMenu open={drawerOpen} onClose={toggleDrawer} />
    </Box>
  );
};
