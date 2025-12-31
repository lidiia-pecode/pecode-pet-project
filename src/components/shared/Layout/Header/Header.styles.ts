import { SxProps, Theme } from '@mui/material';

export const styles = {
  appBar: {
    backgroundColor: '#ffffff96',
    backdropFilter: 'blur(6px)',
    borderBottom: '1px solid #0000001a',
  },
  toolbar: {
    justifyContent: 'space-between',
    gap: 2,
  },
  logo: {
    display: 'flex',
  },

  buttonsContainer: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;
