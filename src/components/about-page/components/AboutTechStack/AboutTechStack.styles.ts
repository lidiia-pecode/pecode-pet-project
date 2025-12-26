import { SxProps, Theme } from '@mui/material';

export const styles = {
  techTitle: {
    fontWeight: 600,
    mb: 3,
  },

  techContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(4, 1fr)',
      md: 'repeat(4, 1fr)',
    },
    gap: 2,
  },

  techCard: {
    p: 2,
    textAlign: 'center',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
  },

  techIcon: {
    color: '#964affff',
    mb: 1.5,
    display: 'flex',
    justifyContent: 'center',
  },

  techIconName: {
    color: '#964affff',
    fontWeight: 600,
  },
} satisfies Record<string, SxProps<Theme>>;
