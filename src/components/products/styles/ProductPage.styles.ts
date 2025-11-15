import { SxProps, Theme } from '@mui/material';

export const searchBarContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  px: 2,
};

export const filtersBarContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'end',
  px: 2,
  py: 1,
  minHeight: 56,
};

export const filtersBarInnerStyles: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
};

export const viewModeSwitcherContainerStyles: SxProps<Theme> = {
  ml: 'auto',
  display: { xs: 'none', sm: 'block' },
};

export const mainContentStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 3,
  p: 2,
};

export const filtersSidebarStyles: SxProps<Theme> = {
  width: 260,
  flexShrink: 0,
};

export const productsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flexGrow: 1,
  minHeight: 520,
};

export const paginationStyles: SxProps<Theme> = {
  mt: 'auto',
  display: 'flex',
  justifyContent: 'center',
};

export const drawerPaperStyles: SxProps<Theme> = {
  width: 300,
};
