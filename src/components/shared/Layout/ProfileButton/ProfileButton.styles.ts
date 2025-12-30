import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  button: {
    border: '1px solid #78cc1d',
    height: 32,
    width: 32,
    color: '#78cc1d',
    backgroundColor: '#fff',
    transition: '0.2s ease',
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 0 8px #99E548',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
