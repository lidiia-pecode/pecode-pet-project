import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  mainBox: {
    position: 'relative',
    display: 'flex',
    gap: 4,
    flexDirection: { xs: 'column', md: 'row' },
  },
  carouselBox: { flex: 1, maxWidth: { md: '50%' } },
  infoBox: { flex: 1 },
} satisfies Record<string, SxProps<Theme>>;