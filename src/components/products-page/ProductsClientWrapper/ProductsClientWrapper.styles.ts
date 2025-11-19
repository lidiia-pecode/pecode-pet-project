import { SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

export const productsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flexGrow: 1,
  minHeight: 520,
};
export const mainContentStyles: SxProps<Theme> = { display: 'flex', gap: 3 };
export const filtersSidebarStyles: SxProps<Theme> = {
  width: 260,
  flexShrink: 0,
};
