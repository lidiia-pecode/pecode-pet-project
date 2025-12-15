'use client';

import { Box, TextField, Button, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCategories } from '@/hooks/categories/useCategories';
import { NewProductFormData, newProductSchema } from '@/types/NewProduct';
import { apiPost } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';

import { FormAlerts } from '../shared/FormAlert';
import { FormLayout } from './FormLayout';
import { ImageUploader } from './ImageUploader';

export const NewProductForm = () => {
  const { data: categories, isLoading } = useCategories();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(newProductSchema),
    mode: 'onChange',
    defaultValues: {
      images: [],
    },
  });

  const onSubmit = async (data: NewProductFormData) => {
    try {
      await apiPost('/products/', data);
      reset();
      alert.success('Product added successfully!');
    } catch (err) {
      console.error(err);
      alert.error('Unable to create the product');
    }
  };

  return (
    <>
      <FormLayout title='Add New Product'>
        <Controller
          name='categoryId'
          control={control}
          render={({ field }) => (
            <TextField
              select
              label='Category'
              size='small'
              sx={{
                width: { xs: 160, sm: 240 },
                position: 'absolute',
                top: 32,
                right: 32,
              }}
              {...field}
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message && 'Category is required'}
              value={field.value ?? ''}
            >
              {isLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
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

        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label='Title'
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              fullWidth
              label='Price'
              type='number'
              {...register('price', { valueAsNumber: true })}
              error={!!errors.price}
              helperText={
                errors.price?.message && 'Price must be greater than 0'
              }
            />
          </Box>

          <TextField
            label='Description'
            multiline
            rows={4}
            fullWidth
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Controller
            name='images'
            control={control}
            render={({ field }) => (
              <ImageUploader
                onError={alert.error}
                value={field.value}
                onChange={field.onChange}
                error={errors.images?.message}
                maxImages={5}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant='text'
              color='secondary'
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Add Product
            </Button>
          </Box>
        </Box>
      </FormLayout>

      <FormAlerts {...alert} />
    </>
  );
};
