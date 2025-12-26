import { SxProps, Theme } from '@mui/material';

export const styles = {
  paper: {
    position: 'absolute',
    top: '105%',
    left: 0,
    right: 0,
    zIndex: 20,
  },
} satisfies Record<string, SxProps<Theme>>;