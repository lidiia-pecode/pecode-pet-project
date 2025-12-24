'use client';

import { Drawer, Box, Divider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Navbar } from '@/components/shared/Layout/NavBar/Navbar';
import { mobileMenu } from '../Header.styles';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={mobileMenu.container}>
        <Box sx={mobileMenu.header}>
          <Typography variant='h6' sx={mobileMenu.title}>
            Menu
          </Typography>

          <IconButton onClick={onClose} sx={mobileMenu.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={mobileMenu.divider} />

        <Navbar direction='column' spacing={2} />
      </Box>
    </Drawer>
  );
};
