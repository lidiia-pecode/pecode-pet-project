import { SxProps, Theme } from '@mui/material';

export const styles = {
  paper: {
    width: '100%',
    p: 4,
    borderRadius: 3,
    maxWidth: 450,
    mx: 'auto',
    mt: 4,
    boxShadow: '0 0 20px #0000001a',
  },

  title: {
    textAlign: 'center',
    fontWeight: 600,
    mb: 3,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  submitButton: {
    mt: 1,
    py: 1.5,
  },

  footerText: {
    mt: 3,
    textAlign: 'center',
    color: 'text.secondary',
  },

  switchModeButton: {
    fontWeight: 600,
    textTransform: 'none',
    ml: 2,
    '&:hover': {
      textDecoration: 'underline',
      background: 'none',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
