import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  buttonText: { width: { xs: '100%', sm: 'auto' } },

  buttonIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff7e',
    borderRadius: '4px',
    border: '1px solid #89a3ffff',
    color: 'primary.main',
    transition: '0.2s',
    '&:hover': {
      backgroundColor: '#ffffffae',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
