import { SxProps, Theme } from '@mui/material';

export const styles = {
  containerRow: {
    display: {xs: 'none', md: 'flex'},
    flexDirection: 'row',
    gap: 3,
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
