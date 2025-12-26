import { AppBar, Toolbar, Typography } from '@mui/material';
import { Navbar } from '@/components/shared/Layout/NavBar';
import { MobileMenuButton } from '../MobileMenuButton';

import { styles } from './Header.styles';

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

        <MobileMenuButton />
      </Toolbar>
    </AppBar>
  );
};
