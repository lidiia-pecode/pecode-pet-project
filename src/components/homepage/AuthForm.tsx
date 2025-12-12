'use client';

import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormData,
  schemaLogin,
  schemaRegister,
  AuthFormData,
} from '@/types/Auth';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { useAlert } from '@/hooks/useAlert';
import { FormAlerts } from '../FormAlert';

export const AuthForm = () => {
  const alert = useAlert();
  const { mode, loading, handleModeSwitch, onSubmit } = useAuthForm(alert.success, alert.error);
  const schema = mode === 'login' ? schemaLogin : schemaRegister;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleFormSubmit = (data: AuthFormData) => {
    onSubmit(data, () => reset());
    reset();
  };

  const nameError =
    mode === 'register'
      ? (errors as FieldErrors<RegisterFormData>).name
      : undefined;

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 450,
          mx: 'auto',
          mt: 4,
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant='h5'
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 600, mb: 3 }}
        >
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </Typography>

        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          {mode === 'register' && (
            <TextField
              label='Name'
              autoComplete='name'
              autoFocus
              {...register('name')}
              error={!!nameError}
              helperText={nameError?.message}
              disabled={loading}
            />
          )}

          <TextField
            label='Email'
            type='email'
            autoComplete='email'
            autoFocus={mode === 'login'}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading}
          />

          <TextField
            label='Password'
            type='password'
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            disabled={loading}
            sx={{ mt: 1, py: 1.5 }}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Sign Up'}
          </Button>
        </Box>

        <Typography
          sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}
        >
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
          <Button
            onClick={handleModeSwitch}
            disabled={loading}
            variant='text'
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              ml: 2,
              '&:hover': { textDecoration: 'underline', background: 'none' },
            }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </Button>
        </Typography>
      </Paper>

      <FormAlerts {...alert} />
    </>
  );
};
