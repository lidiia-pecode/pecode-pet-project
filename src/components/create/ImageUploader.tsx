'use client';

import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadImages } from '@/lib/utils/uploadImages';

interface ImageUploaderProps {
  value: string[];
  onChange: (value: string[]) => void;
  onError?: (msg: string) => void;
  error?: string;
  maxImages?: number;
}

export const ImageUploader = ({
  value,
  onChange,
  onError = () => {},
  error,
  maxImages = 1,
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        setIsUploading(true);
        const urls = await uploadImages(files);
        const next = maxImages === 1 ? [urls[0]] : [...value, ...urls];
        onChange(next);
      } catch (err) {
        console.error(err);
        onError('Failed to upload some images. Check file format and size.');
      } finally {
        setIsUploading(false);
      }
    },
    [maxImages, value, onChange, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          height: 80,
          border: '2px dashed #ccc',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <input {...getInputProps()} />
        {isUploading && <CircularProgress size={24} />}
        {!isUploading &&
          (isDragActive
            ? 'Drop images here...'
            : 'Drag & drop image here, or click')}

        {error && (
          <Typography color='error' variant='caption' sx={{position: 'absolute', top: 82, left: 14 }}>
            {error}
          </Typography>
        )}
      </Box>

      {value.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {value.map((url, idx) => (
            <Box key={idx} sx={{ position: 'relative' }}>
              <Image
                src={url}
                alt='uploaded'
                width={100}
                height={100}
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
              <IconButton
                size='small'
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: '#fff',
                }}
                onClick={() => removeImage(idx)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
