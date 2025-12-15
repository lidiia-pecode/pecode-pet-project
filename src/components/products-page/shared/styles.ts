import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const centeredBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: 2,
};