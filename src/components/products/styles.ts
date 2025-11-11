import { SxProps, Theme } from '@mui/material';

export const CARD_SX: SxProps<Theme> = {
  width: '100%',
  minHeight: 320,
  borderRadius: 2,
  boxShadow: 2,
  display: 'flex',
  flexDirection: 'column',
};

export const MEDIA_SX: SxProps<Theme> = {
  height: 180,
  objectFit: 'contain',
  p: 2,
};

export const TITLE_SX: SxProps<Theme> = {
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const PRICE_SX: SxProps<Theme> = {
  mt: 1,
  color: 'text.secondary',
};
