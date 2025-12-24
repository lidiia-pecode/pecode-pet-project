import { SxProps, Theme } from '@mui/material';

export const productAdditionalStyles = {
  container: {
    mt: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  text: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  chip: {
    mt: 0.5,
    fontSize: '0.75rem',
    fontWeight: 500,
  },
} satisfies Record<string, SxProps<Theme>>;
