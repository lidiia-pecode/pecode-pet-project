import { ProductFormData } from '@/types/NewProduct';
import { Box, MenuItem, TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { ImageUploader } from '../ImageUploader';
import { Category } from '@/types/Categories';
import { styles } from './ProductForm.styles';

interface ProductFormProps {
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  categories?: Category[];
  isCategoriesLoading?: boolean;
  showCategory?: boolean;
}

export const ProductForm = ({
  control,
  register,
  errors,
  categories = [],
  isCategoriesLoading = false,
  showCategory = false,
}: ProductFormProps) => (
  <>
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

    <Box sx={styles.rowBox}>
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
  </>
);
