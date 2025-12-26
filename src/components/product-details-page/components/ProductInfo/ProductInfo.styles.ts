import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 1.5, sm: 2, md: 3 },
  },
  title: {
    fontSize: { xs: 24, sm: 36 },
    fontWeight: 600,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  price: {
    fontWeight: 'bold',
    fontSize: { xs: 24, sm: 32 },
    mb: 1,
  },
  addToCartButton: {
    width: { xs: '100%', sm: 'auto' },
  },
  divider: {
    mt: 2,
    mb: 1,
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
    color: 'text.secondary',
    lineHeight: 1.8,
    fontSize: { xs: 16, sm: 18 },
  },
} satisfies Record<string, SxProps<Theme>>;
