import { useState } from 'react';

import { getProfile, loginWithTokenResponse, registerUser } from '@/lib/api/auth/registerUser';
import { AuthMode, AuthFormData, RegisterFormData } from '@/types/Auth';
import { useProductsStore } from '@/store/productsStore';
import { alertMessages } from '@/lib/utils/constants';

export const useAuthForm = (
  onError: (msg: string) => void,
  onSuccess: (msg: string) => void
) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const setRole = useProductsStore(state => state.setRole);

  const handleModeSwitch = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const onSubmit = async (
    data: AuthFormData,
    onClear: () => void
  ): Promise<boolean> => {
    setLoading(true);

    try {
      if (mode === 'register') {
        const { name, role, email, password } = data as RegisterFormData;
        await registerUser({ name, role, email, password });
        const token = await loginWithTokenResponse({ email, password });
        const user = await getProfile(token.access_token);
        setRole(user.role);
      } else {
        const token = await loginWithTokenResponse(data);
        const user = await getProfile(token.access_token);
        setRole(user.role);
      }
      onClear();
      onSuccess(alertMessages.auth.success);
      return true;
    } catch (err) {
      console.log(err);
      onError(alertMessages.auth.error);
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
