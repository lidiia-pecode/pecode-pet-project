import { AppBar, Toolbar, Typography } from '@mui/material';
import { Navbar } from '@/components/shared/Layout/NavBar/Navbar';
import { MobileMenuButton } from './components/MobileMenuButton';

import { header } from './Header.styles';

export const Header = () => {
  return (
    <AppBar
      position='sticky'
      elevation={2}
      color='transparent'
      sx={header.appBar}
    >
      <Toolbar sx={header.toolbar}>
        <Typography variant='h6' sx={header.title}>
          Pecode Store
        </Typography>

        <Navbar />

        <MobileMenuButton />
      </Toolbar>
    </AppBar>
  );
};
