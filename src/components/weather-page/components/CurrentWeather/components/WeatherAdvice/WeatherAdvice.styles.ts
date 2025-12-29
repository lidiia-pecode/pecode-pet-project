import { SxProps, Theme } from '@mui/material';

export const styles = {
  wrapper: { position: 'relative' },

  button: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    borderRadius: '50%',
    color: '#6c81ce',
  },

  popperPaper: {
    p: 2,
    width: 'fit-content',
    maxWidth: 400,
    borderRadius: 2,
    background: '#fff',
    boxShadow: '0 0 20px #0004',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: -12,
      right: 20,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '12px solid #fff',
    },
  },
  
  loadingBox: { display: 'flex', alignItems: 'center', gap: 2 },
} satisfies Record<string, SxProps<Theme>>;
