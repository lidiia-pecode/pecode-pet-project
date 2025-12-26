'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';

import { apiPost } from '@/lib/api/fetcher';
import { NewCategoryFormData, newCategorySchema } from '@/types/Categories';
import { FormWrapper } from '@/components/shared/FormWrapper';
import { ImageUploader } from '@/components/shared/ImageUploader';

interface CategoryFormWrapperProps {
  onClose: () => void;
}

export const CategoryFormWrapper = ({ onClose }: CategoryFormWrapperProps) => {
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
      await apiPost('/categories/', data);
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper
      title='Add New Category'
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => {
        reset();
        onClose();
      }}
      isSubmitting={isSubmitting}
    >
      <TextField
        fullWidth
        label='Category Name'
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        name='image'
        control={control}
        render={({ field }) => (
          <ImageUploader
            value={field.value ? [field.value] : []}
            onChange={v => field.onChange(v[0] ?? '')}
            error={errors.image?.message}
            maxImages={1}
          />
        )}
      />
    </FormWrapper>
  );
};
