import { SxProps, Theme } from '@mui/material';

export const styles = {
  checkboxWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 1,
  },
} satisfies Record<string, SxProps<Theme>>;

export const metricTabButtonStyles = {
  baseButton: {
    flex: 1,
    textAlign: 'center',
    py: 1,
    fontWeight: 600,
    cursor: 'pointer',
  },

  inactiveButton: {
    color: 'text.secondary',
    backgroundColor: 'grey.100',
  },

  activeButton: {
    color: '#fff',
    backgroundColor: 'primary.main',
  },
} satisfies Record<string, SxProps<Theme>>;
