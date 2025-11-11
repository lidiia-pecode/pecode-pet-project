import { Container, Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <Header />
      <Container component='main' sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
