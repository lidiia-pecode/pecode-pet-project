import { AppBar, Box, Toolbar, Typography } from '@mui/material';

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
        <Typography variant='h6' sx={styles.title}>
          Pecode Store
        </Typography>

        <Navbar />

        <Box sx={styles.buttonsContainer}>
          <ProfileButton />
          <MobileMenuButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
