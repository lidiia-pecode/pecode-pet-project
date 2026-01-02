import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  button: {
    border: '1.5px solid #90c85549',
    height: 32,
    width: 32,
    borderRadius: 1,
    color: '#78a746ff',
    backgroundColor: '#fff',
    transition: '0.2s ease',
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 0 4px #90c85567',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
