export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export type CategorySlug = Category['slug'];

import { z } from 'zod';

export const newCategorySchema = z.object({
  name: z.string().min(2),
  image: z.string().nonempty('Image is required'),
});

export type NewCategoryFormData = z.infer<typeof newCategorySchema>;
