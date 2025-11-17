import { AppBar, Toolbar, Typography } from '@mui/material';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileMenuButton } from './MobileMenuButton';

export const Header = () => {
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

        <Navbar />

        <MobileMenuButton />
      </Toolbar>
    </AppBar>
  );
};
