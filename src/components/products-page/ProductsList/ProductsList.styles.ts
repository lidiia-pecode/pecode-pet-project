import { SxProps, Theme } from '@mui/material';

export const emptyBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: 2,
};
