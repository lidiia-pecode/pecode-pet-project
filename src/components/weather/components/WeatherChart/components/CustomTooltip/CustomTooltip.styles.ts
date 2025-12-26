import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  paper: {
    bgcolor: '#0d2872',
    color: 'white',
    p: 2,
    borderRadius: 2,
    minWidth: 140,
  },
  
  date: { fontWeight: 600, mb: 1 },
} satisfies Record<string, SxProps<Theme>>;
