import { SxProps, Theme } from '@mui/material';

export const styles = {
  appBar: {
    backdropFilter: 'blur(6px)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  toolbar: {
    justifyContent: 'space-between',
    gap: 2,
  },
  title: {
    fontWeight: 600,
  },
} satisfies Record<string, SxProps<Theme>>;

export const mobileMenu = {
  container: {
    width: 280,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  title: {
    fontWeight: 600,
  },
  divider: {
    mb: 2,
  },
  buttonWrapper: {
    display: { xs: 'block', md: 'none' },
  },

  closeButton: {
    color: 'text.primary',
  },
} satisfies Record<string, SxProps<Theme>>;
