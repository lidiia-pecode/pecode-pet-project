'use client';

import { TextField, Button, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiPost } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';
import { FormAlerts } from '../shared/FormAlert';
import { NewCategoryFormData, newCategorySchema } from '@/types/Categories';
import { FormLayout } from './FormLayout';
import { ImageUploader } from './ImageUploader';

export const NewCategoryForm = () => {
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewCategoryFormData>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: { image: '' },
  });

  const onSubmit = async (data: NewCategoryFormData) => {
    try {
      await apiPost('/categories/', {
        ...data,
        image: data.image,
      });
      reset();
      alert.success('Category created!');
    } catch (err) {
      console.log(err);
      alert.error('Failed to create category');
    }
  };

  return (
    <>
      <FormLayout title='Add New Category'>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label='Category Name'
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <ImageUploader
                onError={alert.error}
                value={field.value ? [field.value] : []}
                onChange={v => field.onChange(v[0] ?? '')}
                error={errors.image?.message}
                maxImages={1}
              />
            )}
          />

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
          >
            <Button onClick={() => reset()} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Add Category
            </Button>
          </Box>
        </Box>
      </FormLayout>

      <FormAlerts {...alert} />
    </>
  );
};
