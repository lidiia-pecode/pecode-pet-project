'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, MenuItem, TextField } from '@mui/material';

import { styles } from './ProductFormWrapper.styles';
import { apiPost, apiPut } from '@/lib/api/fetcher';
import { ProductFormData, productSchema } from '@/types/NewProduct';
import { Product } from '@/types/Product';
import { useCategories } from '@/hooks/categories/useCategories';
import { FormWrapper } from '@/components/shared/FormWrapper';
import { ImageUploader } from '../ImageUploader';

interface ProductFormWrapperProps {
  product?: Product;
  showCategory: boolean;
  onClose: () => void;
}

export const ProductFormWrapper = ({
  product,
  showCategory,
  onClose,
}: ProductFormWrapperProps) => {
  const isUpdate = !!product;
  const { data: categories, isLoading } = useCategories();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: isUpdate
      ? {
          title: product.title,
          price: product.price,
          description: product.description,
          images: product.images,
          categoryId: product.category.id,
        }
      : { images: [] },
    mode: 'onChange',
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isUpdate) {
        await apiPut(`/products/${product!.id}`, data);
      } else {
        await apiPost('/products/', data);
      }
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper
      title={isUpdate ? 'Update Product' : 'Add New Product'}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => {
        reset();
        onClose();
      }}
      isSubmitting={isSubmitting}
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
    </FormWrapper>
  );
};
