'use client';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useForm, FieldErrors, useWatch } from 'react-hook-form';
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
import { useRouter } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export const AuthForm = () => {
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
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
