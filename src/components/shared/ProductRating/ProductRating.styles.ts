import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  containerLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  countText: {
    ml: 0.5,
  },
} satisfies Record<string, SxProps<Theme>>;
