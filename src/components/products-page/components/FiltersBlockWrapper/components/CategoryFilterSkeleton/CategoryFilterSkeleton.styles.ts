import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

export const styles = {
  skeletonBox: { display: 'flex', alignItems: 'center', m: 1, ml: 0 },
  skeletonItem: { mr: 1 },
} satisfies Record<string, SxProps<Theme>>;
