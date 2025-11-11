import { Box, Typography } from '@mui/material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component='footer'
      sx={{
        p: 2,
        mt: 'auto',
        textAlign: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        © {currentYear} Pecode Store
      </Typography>
    </Box>
  );
};
