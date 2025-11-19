import { SxProps, Theme } from '@mui/material';

export const listStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)', 
      sm: 'repeat(2, 1fr)', 
      lg: 'repeat(3, 1fr)',
    },
    gap: 2,
  },
  emptyBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
};
