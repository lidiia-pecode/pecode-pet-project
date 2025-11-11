import { loginUser } from '@/lib';
import { LoginPayload, LoginResponse } from '@/types/Auth';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: data => {
      console.log('User logged in, token:', data.token);
    },
  });
}
