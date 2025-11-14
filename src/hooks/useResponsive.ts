import { useTheme, useMediaQuery } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  return {
    isTablet: useMediaQuery(theme.breakpoints.down('md')),
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
  };
};
