import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  centeredBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: 2,
  },
} satisfies Record<string, SxProps<Theme>>;
