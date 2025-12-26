import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: { xs: 32, md: 48 },
    mb: 4,
    textAlign: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;
