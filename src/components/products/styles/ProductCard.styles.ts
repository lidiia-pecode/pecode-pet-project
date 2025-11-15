import { SxProps, Theme } from '@mui/material';

export const cardStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
  gap: 2,
  p: 2,
  pb: 3,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'transform 0.15s ease',
  '&:hover': { transform: 'scale(1.02)' },
};

export const mediaStyles: SxProps<Theme> = {
  height: 180,
  objectFit: 'contain',
};

export const contentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  p: 0,
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const priceStyles: SxProps<Theme> = {
  fontSize: 20,
  fontWeight: 500,
  color: 'text.secondary',
};

export const actionsStyles: SxProps<Theme> = {
  p: 0,
};
