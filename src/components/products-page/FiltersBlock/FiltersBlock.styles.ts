import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

export const paperStyles = (isTablet: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  flexShrink: 0,
  height: 'fit-content',
  borderRadius: isTablet ? 0 : 3,
  boxShadow: isTablet ? 'none' : '',
  width: isTablet ? 300 : 260,
  p: isTablet ? 2 : 3,
  pt: 3,
  position: 'sticky',
  top: isTablet ? 0 : 80,
});
