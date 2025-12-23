import { SxProps, Theme } from '@mui/material';

export const styles = {
  paper: {
    p: 4,
    borderRadius: 3,
    flex: 1,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: 800,
    position: 'relative',
  },
  title: {
    mb: 5,
    mt: {
      xs: 1,
      sm: 0,
    },
    fontSize: {
      xs: '18px',
      sm: '24px',
      md: '32px',
    },
  },
  formContainer: { display: 'flex', flexDirection: 'column', gap: 3 },
} satisfies Record<string, SxProps<Theme>>;
