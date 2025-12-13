import { useState } from 'react';
import { registerUser } from '@/lib/api/auth/registerUser';
import { loginUser } from '@/lib/api/auth/loginUser';
import { AuthMode, AuthFormData, RegisterFormData } from '@/types/Auth';

export const useAuthForm = (
  // success: (msg: string) => void,
  error: (msg: string) => void
) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const handleModeSwitch = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const onSubmit = async (
    data: AuthFormData,
    onSuccess: () => void
  ): Promise<boolean> => {
    setLoading(true);

    try {
      if (mode === 'register') {
        const { name, email, password } = data as RegisterFormData;
        await registerUser({ name, email, password });
        await loginUser({ email, password });
        // success('Registration successful! You are now logged in.');
      } else {
        await loginUser(data);
        // success('Welcome back!');
      }
      onSuccess();
      return true;
    } catch (err) {
      console.error(err);
      error('Something went wrong');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    loading,
    handleModeSwitch,
    onSubmit,
  };
};
