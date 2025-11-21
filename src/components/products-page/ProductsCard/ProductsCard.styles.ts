import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const baseStyles: Record<string, SxProps<Theme>> = {
  cardGrid: {
    cursor: 'pointer',
    '&:hover': { boxShadow: 6 },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageGrid: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
    backgroundColor: 'background.paper',
  },
  title: {
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  description: {
    minHeight: 72,
    mt: 0.5,
    color: 'text.secondary',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  price: {
    fontWeight: 700,
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    mt: 1,
  },
};
