import { SxProps, Theme } from '@mui/material';

export const styles = {
  row: {
    display: 'flex',
    height: 80,
    borderBottom: '1px solid #eee',
  },

  cellBase: {
    display: 'flex',
    alignItems: 'center',
    px: 1,
    borderRight: '1px solid #f0f0f0',
    backgroundColor: 'background.paper',
  },

  pinned: {
    position: 'sticky',
    zIndex: 1,
  },

  normal: {
    position: 'relative',
  },
} satisfies Record<string, SxProps<Theme>>;
