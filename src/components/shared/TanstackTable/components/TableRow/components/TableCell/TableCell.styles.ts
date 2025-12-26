import { SxProps, Theme } from '@mui/material';

export const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    px: 1,
    borderRight: '1px solid #f0f0f0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  pinned: {
    position: 'sticky',
    backgroundColor: 'background.paper',
    zIndex: 2,
  },

  normal: {
    position: 'relative',
    zIndex: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
