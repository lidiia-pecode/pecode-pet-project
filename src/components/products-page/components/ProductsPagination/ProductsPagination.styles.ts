import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  stack: {
    mt: 4,
    alignItems: 'center',
  },
  pagination: {
    color: 'primary',
  }
} satisfies Record<string, SxProps<Theme>>;