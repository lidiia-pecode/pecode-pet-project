import { Container, Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer/Footer';
import { layout } from './Layout.styles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={layout.root}>
      <Header />
      <Container component='main' maxWidth='xl' sx={layout.main}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
