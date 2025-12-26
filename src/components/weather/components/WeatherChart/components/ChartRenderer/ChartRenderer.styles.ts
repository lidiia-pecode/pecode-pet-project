import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  axisTick: {
    fontSize: 12,
    fill: '#1e3a8a',
  },
  legendWrapperBase: {
    borderRadius: 2,
    padding: 8,
    cursor: 'default',
  },
  legendWrapperTablet: {
    backgroundColor: 'transparent',
    marginTop: 16,
  },
  legendWrapperDesktop: {
    backgroundColor: '#0d2872',
    marginTop: 0,
  },
} satisfies Record<string, SxProps<Theme>>;