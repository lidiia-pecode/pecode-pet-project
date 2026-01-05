import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '11px'
  }
} satisfies Record<string, SxProps<Theme>>;
