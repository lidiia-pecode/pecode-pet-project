'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCategories } from '@/hooks/categories/useCategories';
import { NewProductFormData, newProductSchema } from '@/types/NewProduct';
import { uploadImages } from '@/lib/utils/uploadImages';
import Image from 'next/image';

export const NewProductForm = () => {
  const { data: categories, isLoading } = useCategories();
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(newProductSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: NewProductFormData) => {
    const normalized = { ...data, images };
    console.log('Submitting:', normalized);
    // api call to add
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const uploadedUrls = await uploadImages(acceptedFiles);
        setImages(prev => [...prev, ...uploadedUrls]);
        setValue('images', [...images, ...uploadedUrls], {
          shouldValidate: true,
        });
      } catch (err) {
        console.error('Error uploading images:', err);
      }
    },
    [images, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 700,
        mx: 'auto',
        mt: 5,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant='h5'>Add New Product</Typography>
        <Controller
          name='categoryId'
          control={control}
          render={({ field }) => (
            <TextField
              select
              label='Category'
              size='small'
              sx={{ width: 220 }}
              {...field}
              value={field.value ?? ''}
            >
              {isLoading ? (
                <MenuItem key='loading' disabled>
                  Loading...
                </MenuItem>
              ) : (
                categories?.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label='Title'
            variant='outlined'
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            label='Price'
            type='number'
            variant='outlined'
            {...register('price', { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Box>

        <TextField
          label='Description'
          multiline
          rows={4}
          fullWidth
          variant='outlined'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Box
          {...getRootProps()}
          sx={{
            p: 2,
            border: '2px dashed #ccc',
            borderRadius: 2,
            textAlign: 'center',
            color: '#999',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag & drop images here, or click to select'}
        </Box>

        {images.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {images.map((url, idx) => (
              <Box key={idx} sx={{ position: 'relative' }}>
                <Image
                  src={url}
                  alt={`upload-${idx}`}
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
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant='text' color='secondary'>
            Cancel
          </Button>
          <Button type='submit' variant='contained' color='primary'>
            Add Product
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
