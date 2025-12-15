import { SxProps, Theme } from '@mui/material';

export const footer = {
  container: {
    p: 2,
    mt: 'auto',
    textAlign: 'center',
    bgcolor: 'background.paper',
  },
  text: {
    color: 'text.secondary',
  },
} satisfies Record<string, SxProps<Theme>>;
