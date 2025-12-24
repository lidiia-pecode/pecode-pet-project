'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiPost, apiPut } from '@/lib/api/fetcher';
import { ProductForm } from '../../../shared/ProductForm';
import { ProductFormData, productSchema } from '@/types/NewProduct';
import { Product } from '@/types/Product';
import { useCategories } from '@/hooks/categories/useCategories';
import { FormWrapper } from '@/components/shared/FormWrapper';

interface ProductFormWrapperProps {
  product?: Product;
  onClose: () => void;
}

export const ProductFormWrapper = ({
  product,
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
      <ProductForm
        control={control}
        register={register}
        errors={errors}
        showCategory
        categories={categories}
        isCategoriesLoading={isLoading}
      />
    </FormWrapper>
  );
};
