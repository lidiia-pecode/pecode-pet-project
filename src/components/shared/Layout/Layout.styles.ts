import { SxProps, Theme } from '@mui/material';

export const layout = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    py: 4,
  },
} satisfies Record<string, SxProps<Theme>>;
