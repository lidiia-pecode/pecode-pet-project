import { Box, Typography } from '@mui/material';
import { footer } from './Footer.styles';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component='footer'
      sx={footer.container}
    >
      <Typography variant='body2' sx={footer.text}>
        © {currentYear} Pecode Store
      </Typography>
    </Box>
  );
};
