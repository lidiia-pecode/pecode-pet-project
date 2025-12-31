import Image from 'next/image';
import { AppBar, Box, Toolbar } from '@mui/material';

import { styles } from './Header.styles';
import { Navbar } from '@/components/shared/Layout/NavBar';
import { MobileMenuButton } from '../MobileMenuButton';
import { ProfileButton } from '../ProfileButton';

export const Header = () => {
  return (
    <AppBar
      position='sticky'
      elevation={2}
      color='transparent'
      sx={styles.appBar}
    >
      <Toolbar sx={styles.toolbar}>
        <Box component='a' href={'/'} sx={styles.logo}>
          <Image
            src='/logo-pet-project.webp'
            alt='logo'
            width={100}
            height={60}
          />
        </Box>

        <Navbar />

        <Box sx={styles.buttonsContainer}>
          <ProfileButton />
          <MobileMenuButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
