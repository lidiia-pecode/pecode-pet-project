import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { centeredBox } from '../shared/styles';

export const emptyStateStyles = {
  container: centeredBox,
  title: {
    color: 'text.secondary',
  },

  subtitle: {
    color: 'text.disabled',
  },
} satisfies Record<string, SxProps<Theme>>;

export const productsGridViewStyles = {
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
    },
    gap: 2,
  },
} satisfies Record<string, SxProps<Theme>>;

export const productsGridSkeletonStyles = {
  cardsContainer: productsGridViewStyles.cardsContainer,
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    overflow: 'hidden',
  },
} satisfies Record<string, SxProps<Theme>>;
