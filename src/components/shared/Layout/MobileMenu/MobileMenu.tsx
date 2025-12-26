'use client';

import { Drawer, Box, Divider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { styles } from './MobileMenu.styles';
import { Navbar } from '@/components/shared/Layout/NavBar';


interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant='h6' sx={styles.title}>
            Menu
          </Typography>

          <IconButton onClick={onClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={styles.divider} />

        <Navbar direction='column' spacing={2} />
      </Box>
    </Drawer>
  );
};
