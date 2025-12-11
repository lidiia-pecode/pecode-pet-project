import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api/auth/registerUser';
import { loginUser } from '@/lib/api/auth/loginUser';
import { AuthMode, AuthFormData, RegisterFormData } from '@/types/Auth';


export const useAuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleModeSwitch = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const onSubmit = async (data: AuthFormData, onSuccess: () => void) => {
    setLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const registerData = data as RegisterFormData;
        await registerUser({
          name: registerData.name!,
          email: registerData.email,
          password: registerData.password,
        });
        setSuccess('Registration successful! You can now log in.');
        setMode('login');
        onSuccess();
      } else {
        await loginUser(data);
        router.refresh();
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return {
    mode,
    loading,
    error,
    success,
    handleModeSwitch,
    onSubmit,
  };
};
