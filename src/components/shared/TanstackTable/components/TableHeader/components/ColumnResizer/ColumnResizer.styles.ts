import { SxProps, Theme } from '@mui/material';

export const styles = {
  box: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 6,
    cursor: 'col-resize',
    zIndex: 20,
    '&:hover': { backgroundColor: 'primary.main', opacity: 0.3 },
  },
} satisfies Record<string, SxProps<Theme>>;