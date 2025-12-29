import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 3,
    alignItems: 'flex-start',
  },

  tempRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  tempIcon: {
    ml: '-10px',
  },

  feelsLike: {
    opacity: 0.8,
  },

  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
} satisfies Record<string, SxProps<Theme>>;