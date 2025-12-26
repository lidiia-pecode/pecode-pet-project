import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  formControl: {
    minWidth: {
      xs: 160,
      sm: 200,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
