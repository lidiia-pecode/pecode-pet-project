import { z } from 'zod';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  avatar: string;
  creationAt: string;
  updatedAt: string;
};

const baseSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const schemaRegister = baseSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['customer', 'admin']),
});

export const schemaLogin = baseSchema;

export type LoginFormData = z.infer<typeof schemaLogin>;
export type RegisterFormData = z.infer<typeof schemaRegister>;
export type AuthFormData = LoginFormData | RegisterFormData;
export type AuthMode = 'login' | 'register';

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must contain at least 2 characters')
    .max(40, 'Name is too long'),

  email: z.email('Invalid email format'),

  avatar: z
    .url('Invalid image URL'),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

