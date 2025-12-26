import { SxProps, Theme } from '@mui/material';

export const styles = {
  rootBase: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    position: 'relative',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    mb: 3,
  },

  day: {
    backgroundColor: '#ffffff',
    color: '#000',
  },

  night: {
    backgroundColor: '#0f1e40',
    color: '#fff',
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  title: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontWeight: 600,
    maxWidth: 320,
  },

  content: {
    display: 'flex',
    gap: 6,
    justifyContent: 'center',
  },

  skeleton: {
    width: '100%',
    height: 300,
    borderRadius: 3,
    p: 3,
    mb: 3,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #ffffff 0%, #6c81ce 100%)',
  },
} satisfies Record<string, SxProps<Theme>>;
