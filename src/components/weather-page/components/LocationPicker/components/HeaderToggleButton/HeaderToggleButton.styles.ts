import { SxProps, Theme } from '@mui/material';

export const styles = {
  button: {
    justifyContent: 'flex-start',
    paddingY: 1.2,
    borderRadius: 2,
    textTransform: 'none',
    transition: '0.2s',
    backgroundColor: 'background.paper',
    '&:hover': { backgroundColor: '#edf2fa' },
  },

  icon: { mr: 1 },

  contentBox: {
    flexGrow: 1,
    textAlign: 'left',
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },

  mainText: { fontWeight: 600 },

  expandIconOpen: { transform: 'rotate(180deg)', transition: '0.2s' },
  expandIconClosed: { transform: 'rotate(0deg)', transition: '0.2s' },
} satisfies Record<string, SxProps<Theme>>;
