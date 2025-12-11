import { z } from 'zod';

export const newProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.number().optional(),
  images: z
    .array(z.url('Invalid image URL'))
    .min(1, 'At least one image is required'),
});

export type NewProductFormData = z.infer<typeof newProductSchema>;
