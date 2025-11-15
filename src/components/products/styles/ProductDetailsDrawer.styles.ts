import { SxProps, Theme } from '@mui/material';

export const drawerPaperStyles: SxProps<Theme> = {
  width: { xs: '100%', sm: 500 },
  p: 3,
};

export const headerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: 1,
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 600,
};

export const dividerStyles: SxProps<Theme> = {
  my: 2,
};

export const previewImageStyles: SxProps<Theme> = {
  height: 300,
  borderRadius: 2,
};

export const previewTitleStyles: SxProps<Theme> = {
  visibility: 'hidden',
  maxHeight: 16,
};

export const previewPriceStyles: SxProps<Theme> = {
  fontSize: 22,
  fontWeight: 600,
  mt: 0,
};

export const descriptionStyles: SxProps<Theme> = {
  mt: 2,
};
