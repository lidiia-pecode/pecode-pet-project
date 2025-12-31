import { SxProps, Theme } from '@mui/material';

export const styles = {
  buttonWrapper: {
    display: { xs: 'block', md: 'none' },
  },

  button: {
    width: 32,
    height: 32,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
