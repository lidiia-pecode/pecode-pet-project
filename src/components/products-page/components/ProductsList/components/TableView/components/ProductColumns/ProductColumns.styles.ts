import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  image: {
    width: 64,
    height: 64,
    objectFit: 'cover',
    borderRadius: 1,
  },

  actionCell: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    '&.Mui-checked': {
      color: '#fff',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
