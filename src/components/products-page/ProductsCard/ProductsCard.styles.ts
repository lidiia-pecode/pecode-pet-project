import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const cardStyles = {
  cardGrid: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover': { boxShadow: 6 },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '12px',
  },
  imageGrid: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
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
    fontWeight: 500,
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    mt: 1,
  },

  deleteButtonWrapper: {
    position: 'absolute',
    top: 8,
    left: 8,
    border: '1px solid #ff33925f',
    borderRadius: '4px',
    backgroundColor: '#ffffff5d',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#ffffffc2',
    },
  },

  deleteIcon: {
    color: '#ff33928d',
    height: 22,
    width: 22,
  },

  dialogTitle: { display: 'flex', alignItems: 'center', gap: 1 },
  dialogActions: { px: 3, pb: 3 },
} satisfies Record<string, SxProps<Theme>>;
