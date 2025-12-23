'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCategories } from '@/hooks/categories/useCategories';
import { NewProductFormData, newProductSchema } from '@/types/NewProduct';
import { apiPost } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';

import { Alerts } from '../shared/FormAlert';
import { FormLayout } from './shared/FormLayout';
import { ProductForm } from './shared/ProductForm';

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
        <ProductForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => reset()}
          showCategory
          categories={categories}
          isCategoriesLoading={isLoading}
        />
      </FormLayout>

      <Alerts {...alert} />
    </>
  );
};
