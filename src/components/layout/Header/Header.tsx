'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileMenu } from './MobileMenu';
import { useResponsive } from '@/hooks/useResponsive';

export const Header = () => {
  const { isMobile } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <AppBar
      position='sticky'
      elevation={2}
      color='transparent'
      sx={{
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Pecode Store
        </Typography>

        {isMobile ? (
          <IconButton color='inherit' onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Navbar />
        )}
      </Toolbar>

      <MobileMenu open={drawerOpen} onClose={toggleDrawer} />
    </AppBar>
  );
};
