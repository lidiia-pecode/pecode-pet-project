import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const cardViewStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
  gap: 2,
};
