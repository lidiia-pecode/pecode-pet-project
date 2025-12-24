import { useState } from 'react';
import { getProfile, loginWithTokenResponse, registerUser } from '@/lib/api/auth/registerUser';
// import { loginUser } from '@/lib/api/auth/loginUser';
import { AuthMode, AuthFormData, RegisterFormData } from '@/types/Auth';
import { useProductsStore } from '@/store/productsStore';

export const useAuthForm = (
  error: (msg: string) => void
) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const setRole = useProductsStore(state => state.setRole);

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
        const { name, role, email, password } = data as RegisterFormData;
        const res = await registerUser({ name, role, email, password });
        console.log('Registration response:', res);
        // await loginUser({ email, password });
        const token = await loginWithTokenResponse({ email, password });
        console.log('Login response after registration:', token);
        const user = await getProfile(token.access_token);
        setRole(user.role);

      } else {
        // await loginUser(data);
        const token  = await loginWithTokenResponse(data);
        const user = await getProfile(token.access_token);
        setRole(user.role);
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
