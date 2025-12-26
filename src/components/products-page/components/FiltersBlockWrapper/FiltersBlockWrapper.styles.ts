import { SxProps, Theme } from '@mui/material';

export const styles = {
  drawer: {
    display: { xs: 'block', md: 'none' },
  },
  drawerPaper: {
    p: 2,
  },
  sidebar: {
    width: 260,
    flexShrink: 0,
    display: { xs: 'none', md: 'block' },
  },
} satisfies Record<string, SxProps<Theme>>;
