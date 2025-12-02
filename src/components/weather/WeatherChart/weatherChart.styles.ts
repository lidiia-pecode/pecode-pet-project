const GRADIENT = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  hover: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
};

export const STYLES = {
  button: {
    height: 50,
    display: 'flex',
    gap: 1,
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
    pointerEvents: 'auto' as const,
    background: GRADIENT.primary,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    '&:hover': { background: GRADIENT.hover },
    '&.Mui-disabled': {
      background: '#6876ad',
    },
  },

  chartContainer: (isBlurred: boolean) => ({
    position: 'relative' as const,
    py: 2,
    borderRadius: 2,
    border: '1px solid #ddd',
    backgroundColor: '#6995d8',
    filter: isBlurred ? 'blur(2px)' : 'none',
    transition: 'filter 0.3s',
    pointerEvents: isBlurred ? ('none' as const) : ('initial' as const),
  }),

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
    pointerEvents: 'none' as const,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
} as const;