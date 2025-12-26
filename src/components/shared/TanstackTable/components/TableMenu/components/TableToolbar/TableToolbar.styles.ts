import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  outerBox: { display: 'flex', alignItems: 'center', gap: 2 },
  innerBox: { display: 'flex', alignItems: 'center', gap: 1 },
} satisfies Record<string, SxProps<Theme>>;
