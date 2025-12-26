import { SxProps, Theme } from '@mui/material';

export const styles = {
  multiselectRoot: {
    width: '100%',
    mb: 3,
  },

  tabContainer: {
    display: 'flex',
    mb: 2,
    borderBottom: '1px solid #ccc',
  },

  tabContentWrapper: {
    overflow: 'hidden',
    width: '100%',
  },

  tabContentInner: {
    display: 'flex',
    width: '200%',
    transition: 'transform 0.3s ease',
  },

  tabPane: {
    width: '50%',
    p: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
