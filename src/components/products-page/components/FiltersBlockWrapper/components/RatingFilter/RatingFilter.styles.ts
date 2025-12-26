import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
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