import { Category } from '@/types/Categories';
import { NewProductFormData } from '@/types/NewProduct';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { ImageUploader } from './ImageUploader';

interface ProductFormProps {
  control: Control<NewProductFormData>;
  register: UseFormRegister<NewProductFormData>;
  errors: FieldErrors<NewProductFormData>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;

  showCategory?: boolean;
  categories?: Category[];
  isCategoriesLoading?: boolean;
}

export const ProductForm = ({
  control,
  register,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  showCategory = false,
  categories = [],
  isCategoriesLoading = false,
}: ProductFormProps) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {showCategory && (
        <Controller
          name='categoryId'
          control={control}
          render={({ field }) => (
            <TextField
              select
              label='Category'
              size='small'
              {...field}
              value={field.value ?? ''}
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
            >
              {isCategoriesLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />
      )}

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
          helperText={errors.price?.message}
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
            value={field.value}
            onChange={field.onChange}
            error={errors.images?.message}
            maxImages={5}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant='text' onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
