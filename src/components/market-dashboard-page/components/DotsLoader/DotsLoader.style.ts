import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1,
    fontStyle: 'italic',
  },

  text: { fontWeight: 'bold' },

  dotsContainer: { display: 'flex', gap: 0.5 },
} satisfies Record<string, SxProps<Theme>>;
