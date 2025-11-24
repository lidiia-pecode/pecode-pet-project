import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

export const paperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  flexShrink: 0,
  height: 'fit-content',
  borderRadius: { xs: 0, md: 3 },
  boxShadow: { xs: 'none', md: 2 },
  width: { xs: 300, md: 260 },
  p: { xs: 2, md: 3 },
  pt: 3,
  position: 'sticky',
  top: { xs: 0, md: 80 },
};


export const filtersSidebarStyles: SxProps<Theme> = {
  width: 260,
  flexShrink: 0,
};