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

  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: 2,
  },

  emptyTitle: {
    color: 'text.secondary',
  },

  emptySubtitle: {
    color: 'text.disabled',
  },
} satisfies Record<string, SxProps<Theme>>;
