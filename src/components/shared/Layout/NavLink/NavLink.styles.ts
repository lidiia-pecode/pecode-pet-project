import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styles = {
  base: {
    textDecoration: 'none',
    fontWeight: 500,
    color: 'text.primary',
    borderBottom: '2px solid transparent',
    transition: 'color 0.2s, border-bottom 0.2s',
    display: 'inline-block',
    cursor: 'pointer',
    '&:hover': {
      color: 'primary.main',
      borderBottom: '2px solid',
      borderBottomColor: 'primary.main',
    },
  },
  active: {
    color: 'primary.main',
    borderBottom: '2px solid',
    borderBottomColor: 'primary.main',
  },
} satisfies Record<string, SxProps<Theme>>;
