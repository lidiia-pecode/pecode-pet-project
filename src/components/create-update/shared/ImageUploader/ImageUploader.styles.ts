import { SxProps, Theme } from '@mui/material';

export const styles = {
  uploaderContainer: {
    height: 80,
    border: '2px dashed #ccc',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    cursor: 'pointer',
    position: 'relative',
  },
  errorText: { position: 'absolute', top: 82, left: 14 },
  imagesPreviewContainer: { display: 'flex', gap: 2, flexWrap: 'wrap' },
  imageWrapper: {
    position: 'relative',
  },
  deleteImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
  },
} satisfies Record<string, SxProps<Theme>>;
