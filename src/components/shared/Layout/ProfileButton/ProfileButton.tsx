'use client';

import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { styles } from './ProfileButton.styles';
import { ProfileDrawer } from '../ProfileDrawer';
import { useGlobalStore } from '@/store/globalStore';

export const ProfileButton = () => {
  const user = useGlobalStore(state => state.user);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  if (!user) return null;

  return (
    <Box>
      <IconButton onClick={toggleDrawer} sx={styles.button}>
        <PersonOutlineIcon />
      </IconButton>

      <ProfileDrawer open={open} onClose={toggleDrawer} />
    </Box>
  );
};
