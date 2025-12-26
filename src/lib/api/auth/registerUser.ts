import { apiGet, apiPost } from '../fetcher';

interface RegisterUserBody {
  name: string;
  role: 'customer' | 'admin';
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export async function registerUser(
  body: RegisterUserBody
): Promise<UserResponse> {
  const fullBody = {
    ...body,
    avatar: 'https://example.com/default-avatar.png',
  };

  return apiPost<UserResponse, typeof fullBody>('/users', fullBody);
}


interface LoginUserResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export async function loginWithTokenResponse(data: LoginUserData): Promise<LoginUserResponse> {
  return apiPost<LoginUserResponse, LoginUserData>('/auth/login', data);
}


export async function getProfile(token: string): Promise<UserResponse> {
  return apiGet('/auth/profile', {
    Authorization: `Bearer ${token}`,
  });
}
