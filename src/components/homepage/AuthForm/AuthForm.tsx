'use client';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { useForm, FieldErrors, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormData,
  schemaLogin,
  schemaRegister,
  AuthFormData,
} from '@/types/Auth';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { useAlert } from '@/hooks/useAlert';
import { Alerts } from '../../shared/FormAlert';
import { useRouter } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { authFormStyles } from './AuthForm.styles';
import { useProductsStore } from '@/store/productsStore';

export const AuthForm = () => {
  const userRole = useProductsStore(state => state.role);
  const alert = useAlert();
  const router = useRouter();

  const { mode, loading, handleModeSwitch, onSubmit } = useAuthForm(
    // alert.success,
    alert.error
  );

  const schema = mode === 'login' ? schemaLogin : schemaRegister;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      role: 'customer',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (data: AuthFormData) => {
    const success = await onSubmit(data, () => reset());
    if (!success) return;

    const urlParams = new URLSearchParams(window.location.search);
    const next = urlParams.get('next') || '/';
    router.replace(next);
  };

  const nameError =
    mode === 'register'
      ? (errors as FieldErrors<RegisterFormData>).name
      : undefined;

  const nameValue = useWatch({ control, name: 'name' });
  const emailValue = useWatch({ control, name: 'email' });
  const passwordValue = useWatch({ control, name: 'password' });

  if (userRole) {
    return null;
  }

  return (
    <>
      <Paper elevation={3} sx={authFormStyles.paper}>
        <Typography variant='h5' gutterBottom sx={authFormStyles.title}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={authFormStyles.form}
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
              slotProps={{
                input: {
                  endAdornment: nameValue ? (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        type='button'
                        onClick={() => setValue('name', '')}
                      >
                        <ClearIcon fontSize='small' />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
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
            slotProps={{
              input: {
                endAdornment: emailValue ? (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      type='button'
                      onClick={() => setValue('email', '')}
                    >
                      <ClearIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />

          {mode === 'register' && (
            <Controller
              name='role'
              control={control}
              defaultValue='customer'
              render={({ field }) => (
                <TextField
                  select
                  label='Role'
                  {...field}
                  error={!!(errors as FieldErrors<RegisterFormData>).role}
                  helperText={
                    (errors as FieldErrors<RegisterFormData>).role?.message
                  }
                  disabled={loading}
                >
                  <MenuItem value='customer'>Customer</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </TextField>
              )}
            />
          )}

          <TextField
            label='Password'
            type={showPassword ? 'text' : 'password'}
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    {passwordValue && (
                      <>
                        <IconButton
                          size='small'
                          type='button'
                          onClick={() => setValue('password', '')}
                        >
                          <ClearIcon fontSize='small' />
                        </IconButton>

                        <IconButton
                          size='small'
                          type='button'
                          onClick={() => setShowPassword(p => !p)}
                        >
                          {showPassword ? (
                            <Visibility fontSize='small' />
                          ) : (
                            <VisibilityOff fontSize='small' />
                          )}
                        </IconButton>
                      </>
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type='submit'
            variant='contained'
            size='large'
            disabled={loading}
            sx={authFormStyles.submitButton}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Sign Up'}
          </Button>
        </Box>

        <Typography sx={authFormStyles.footerText}>
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}

          <Button
            onClick={handleModeSwitch}
            disabled={loading}
            variant='text'
            sx={authFormStyles.switchModeButton}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </Button>
        </Typography>
      </Paper>

      <Alerts {...alert} />
    </>
  );
};
