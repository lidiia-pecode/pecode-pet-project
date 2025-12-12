import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api/auth/registerUser';
import { loginUser } from '@/lib/api/auth/loginUser';
import { AuthMode, AuthFormData, RegisterFormData } from '@/types/Auth';

export const useAuthForm = (
  success: (msg: string) => void,
  error: (msg: string) => void
) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleModeSwitch = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const onSubmit = async (data: AuthFormData, onSuccess: () => void) => {
    setLoading(true);

    try {
      if (mode === 'register') {
        const registerData = data as RegisterFormData;

        await registerUser({
          name: registerData.name!,
          email: registerData.email,
          password: registerData.password,
        });

        success('Registration successful! You can now log in.');
        setMode('login');
        onSuccess();
      } else {
        await loginUser(data);

        router.refresh();
        success('Welcome back!');
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      error('Something went wrong');
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
