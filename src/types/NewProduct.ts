import { z } from 'zod';
import { Product } from './Product';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive(),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.number(),
  images: z
    .array(z.url('Invalid image URL'))
    .min(1, 'At least one image is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductResponse = Omit<Product, 'rating'>