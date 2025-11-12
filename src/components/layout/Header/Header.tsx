'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from '@/components/navigation/Navbar';
import { SearchBar } from './SearchBar';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

        {!isMobile && (
          <Box sx={{ flex: 1, maxWidth: 500 }}>
            <SearchBar />
          </Box>
        )}

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
