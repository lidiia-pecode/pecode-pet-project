'use client';

import { Drawer, Box, Divider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Navbar } from '@/components/navigation/Navbar';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box
        sx={{
          width: 280,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Menu
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              color: 'text.primary',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Navbar direction='column' spacing={2} />

      </Box>
    </Drawer>
  );
};
