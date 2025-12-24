import { SxProps, Theme } from '@mui/material';

export const filtersBlockStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  paper: {
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
  },
  mobileTopBar: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column',
    gap: 3,
  },
  mobileCloseButton: {
    display: { xs: 'block', md: 'none' },
  },
} satisfies Record<string, SxProps<Theme>>;

export const filtersBlockWrapperStyles = {
  drawer: {
    display: { xs: 'block', md: 'none' },
  },
  drawerPaper: {
    p: 2,
  },
  sidebar: {
    width: 260,
    flexShrink: 0,
    display: { xs: 'none', md: 'block' },
  },
} satisfies Record<string, SxProps<Theme>>;

export const sliderFilterStyles = {
  title: {
    fontWeight: 600,
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    mb: 0.5,
    color: 'text.secondary',
  },
  sliderContainer: { px: 1 },
} satisfies Record<string, SxProps<Theme>>;

export const categoryFilterStyles = {
  title: {
    fontWeight: 600,
  },
  formGroup: { minHeight: 200 },
  categoryItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
} satisfies Record<string, SxProps<Theme>>;

export const categoryFilterSkeletonStyles = {
  box: { display: 'flex', alignItems: 'center', m: 1, ml: 0 },
  skeleton: { mr: 1 },
} satisfies Record<string, SxProps<Theme>>;
