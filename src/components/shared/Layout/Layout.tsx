import { Container, Box } from '@mui/material';

import { styles } from './Layout.styles';
import { Header } from './Header';
import { Footer } from './Footer';


export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={styles.root}>
      <Header />
      <Container component='main' maxWidth='xl' sx={styles.main}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
