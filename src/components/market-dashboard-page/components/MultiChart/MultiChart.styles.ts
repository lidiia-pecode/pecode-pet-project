import { SxProps, Theme } from '@mui/material';

export const styles = {
  loaderWrapper: {
    width: '100%',
    height: 472,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { display: 'flex', gap: 2, justifyContent: 'space-between' },
  linechart: { backgroundColor: '#212248ff' },
  tick: { fontSize: 10, fill: '#819dd8ff' },
} satisfies Record<string, SxProps<Theme>>;
