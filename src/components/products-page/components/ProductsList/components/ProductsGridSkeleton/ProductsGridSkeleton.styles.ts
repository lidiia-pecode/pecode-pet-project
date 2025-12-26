import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
    },
    gap: 2,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    overflow: 'hidden',
  },
} satisfies Record<string, SxProps<Theme>>;
