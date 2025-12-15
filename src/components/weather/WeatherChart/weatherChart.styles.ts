import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const GRADIENT = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  hover: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
};

export const weatherChartStyles = {
  button: {
    height: 48,
    display: 'flex',
    gap: 1,
    borderRadius: 2,
    background: GRADIENT.primary,
    '&:hover': { background: GRADIENT.hover },
    '&.Mui-disabled': {
      background: '#d8ddf0',
      color: '#f5f5f5',
    },
  },
  overlayButton: {
    height: 50,
    px: 4,
    display: 'flex',
    gap: 1,
    background: GRADIENT.primary,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    '&:hover': { background: GRADIENT.hover },
    '&.Mui-disabled': {
      background: '#6876ad',
    },
  },
  chartContainer: {
    position: 'relative' as const,
    py: 2,
    borderRadius: 2,
    border: '1px solid #ddd',
    backgroundColor: '#6995d8',
  },
  overlay: {
    position: 'absolute' as const,
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
} satisfies Record<string, SxProps<Theme>>;

export const customTooltipStyles = {
  paper: {
    bgcolor: '#0d2872',
    color: 'white',
    p: 2,
    borderRadius: 2,
    minWidth: 140,
  },
} satisfies Record<string, SxProps<Theme>>;


export const chartRendererStyles = {
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