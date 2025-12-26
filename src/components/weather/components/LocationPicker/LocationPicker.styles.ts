import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: {
    width: '100%',
    mb: 2,
  },

  collapseContent: {
    display: 'flex',
    gap: 2,
    mt: 2,
  },

  leftPanel: {
    flex: 1,
  },

  searchWrapper: {
    display: 'flex',
    position: 'relative',
  },

  mapWrapper: {
    width: '100%',
    height: 420,
  },

  mapWrapperLoading: { height: 420, bgcolor: 'grey.100' },
} satisfies Record<string, SxProps<Theme>>;
