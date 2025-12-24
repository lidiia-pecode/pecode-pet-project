'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewProductFormData, newProductSchema } from '@/types/NewProduct';
import { apiPut } from '@/lib/api/fetcher';
import { useAlert } from '@/hooks/useAlert';

import { Alerts } from '../shared/FormAlert';
import { FormLayout } from './shared/FormLayout';
import { Product } from '@/types/Product';
import { useRouter } from 'next/navigation';
import { ProductForm } from './shared/ProductForm';
import { useProductsStore } from '@/store/productsStore';

interface UpdateProductFormProps {
  product: Product;
}

export const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
  const alert = useAlert();
  const route = useRouter();

  const userRole = useProductsStore(state => state.role);
  if (userRole !== 'admin') {
    route.replace('/');
  }

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
      images: product.images,
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id,
    },
  });

  const onSubmit = async (data: NewProductFormData) => {
    console.log('Submitting data:', data);
    try {
      await apiPut<Product, NewProductFormData>(
        `/products/${product.id}`,
        data
      );
      reset();
      alert.success('Product updated successfully!');
      route.replace('/products');
    } catch (err) {
      console.error(err);
      alert.error('Unable to update the product');
    }
  };

  return (
    <>
      <FormLayout title='Update Product Information'>
        <ProductForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => reset()}
        />
      </FormLayout>

      <Alerts {...alert} />
    </>
  );
};
