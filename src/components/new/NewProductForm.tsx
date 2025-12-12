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
  CircularProgress,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCategories } from '@/hooks/categories/useCategories';
import { NewProductFormData, newProductSchema } from '@/types/NewProduct';
import { uploadImages } from '@/lib/utils/uploadImages';
import Image from 'next/image';
import { apiPost } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';
import { FormAlerts } from '../FormAlert';

export const NewProductForm = () => {
  const { data: categories, isLoading } = useCategories();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const alert = useAlert();
  const { success: onSuccess, error: onError } = alert;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(newProductSchema),
    mode: 'onChange',
    defaultValues: { images: [] },
  });

  const onResetForm = () => {
    reset();
    setImages([]);
  };

  const onSubmit = async (data: NewProductFormData) => {
    setValue('images', images, { shouldValidate: true });
    const normalized = { ...data, images };

    try {
      await apiPost('/products/', normalized);
      onResetForm();
      onSuccess('Product added successfully!');
    } catch (err) {
      console.error(err);
      onError('Unable to create the product, please try again later');
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        const uploadedUrls = await uploadImages(acceptedFiles);
        const newImages = [...images, ...uploadedUrls];
        setImages(newImages);
        setValue('images', newImages, { shouldValidate: true });
      } catch (err) {
        console.error('Error uploading images:', err);
        onError('Failed to upload images');
      } finally {
        setIsUploading(false);
      }
    },
    [images, setValue, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    setValue('images', newImages, { shouldValidate: true });
  };

  return (
    <>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          flex: 1,
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
                error={!!errors.categoryId}
                helperText={errors.categoryId ? 'Category is required' : ''}
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

          <Controller
            name='images'
            control={control}
            render={() => (
              <Box
                {...getRootProps()}
                sx={{
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  color: '#999',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <input {...getInputProps()} />
                {isUploading && !isDragActive && <CircularProgress size={24} />}
                {isDragActive
                  ? 'Drop the files here ...'
                  : 'Drag & drop images here, or click to select'}

                {errors.images && (
                  <Typography
                    color='error'
                    variant='caption'
                    sx={{ position: 'absolute', left: 14, bottom: -24 }}
                  >
                    {errors.images.message}
                  </Typography>
                )}
              </Box>
            )}
          />

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
                    onClick={() => removeImage(idx)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant='text' color='secondary' onClick={onResetForm}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Add Product
            </Button>
          </Box>
        </Box>
      </Paper>

      <FormAlerts {...alert} />
    </>
  );
};
