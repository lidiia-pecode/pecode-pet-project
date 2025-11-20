import { SxProps, Theme } from '@mui/material';

export const productInfoStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  title: {
    component: 'h1',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  price: {
    fontWeight: 'bold',
    mb: 2,
  },
  addToCartButton: {
    width: { xs: '100%', sm: 'auto' },
  },
  divider: {
    my: 2,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  descriptionText: {
    variant: 'body1',
    color: 'text.secondary',
    lineHeight: 1.8,
  },
};
