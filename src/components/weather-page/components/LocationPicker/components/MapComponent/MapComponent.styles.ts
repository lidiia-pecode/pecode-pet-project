import { CSSProperties } from "@mui/material";

export const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  marker: {
    width: '20px',
    height: '20px',
    background: '#1976d2',
    borderRadius: '50%',
    boxShadow: '0 0 0 6px rgba(25,118,210,0.35)',
    border: '2px solid white',
    cursor: 'pointer',
  },
};