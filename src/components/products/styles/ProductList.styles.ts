import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  position: 'relative',
};

export const loadingOverlayStyles: SxProps<Theme> = theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bgcolor: `${theme.palette.background.default}d0`,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});


export const gridStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
  gap: 3,
};

export const errorBoxStyles: SxProps<Theme> = {
  p: 4,
  textAlign: 'center',
};

export const emptyBoxStyles: SxProps<Theme> = {
  p: 4,
  textAlign: 'center',
};

export const loadingBoxStyles: SxProps<Theme> = {
  height: '80%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
