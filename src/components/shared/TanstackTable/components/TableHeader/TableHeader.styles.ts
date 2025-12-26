import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
    height: 40,
    backgroundColor: 'action.hover',
    borderBottom: '1px solid #ddd',
  },
} satisfies Record<string, SxProps<Theme>>;
