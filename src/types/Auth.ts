import { z } from 'zod';

const baseSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const schemaRegister = baseSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const schemaLogin = baseSchema;

export type LoginFormData = z.infer<typeof schemaLogin>;
export type RegisterFormData = z.infer<typeof schemaRegister>;
export type AuthFormData = LoginFormData | RegisterFormData;
export type AuthMode = 'login' | 'register';
