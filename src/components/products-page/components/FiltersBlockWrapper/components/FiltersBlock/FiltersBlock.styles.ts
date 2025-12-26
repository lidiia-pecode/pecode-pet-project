import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flexShrink: 0,
    height: 'fit-content',
    borderRadius: { xs: 0, md: 3 },
    boxShadow: { xs: 'none', md: 2 },
    width: { xs: 300, md: 260 },
    p: { xs: 2, md: 3 },
    pt: 3,
    position: 'sticky',
    top: { xs: 0, md: 80 },
  },

  mobileTopBar: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column',
    gap: 3,
  },
  
  mobileCloseButton: {
    display: { xs: 'block', md: 'none' },
  },
} satisfies Record<string, SxProps<Theme>>;
