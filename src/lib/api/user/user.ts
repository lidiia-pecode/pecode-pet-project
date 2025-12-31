import { User } from '@/types/User';
import { apiGet, apiPost, apiPut } from '../fetcher';

interface RegisterUserBody {
  name: string;
  role: 'customer' | 'admin';
  email: string;
  password: string;
}

export async function registerUser(body: RegisterUserBody): Promise<User> {
  const fullBody = {
    ...body,
    avatar: 'https://example.com/default-avatar.png',
  };

  return apiPost<User, typeof fullBody>('/users', fullBody);
}

interface LoginUserResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

type EditProfileData = Omit<User, 'creationAt' | 'updatedAt' | 'id'>;

export async function loginWithTokenResponse(
  data: LoginUserData
): Promise<LoginUserResponse> {
  return apiPost<LoginUserResponse, LoginUserData>('/auth/login', data);
}

export async function getProfile(token: string): Promise<User> {
  return apiGet('/auth/profile', {
    Authorization: `Bearer ${token}`,
  });
}

export async function editProfile(id: number, data: EditProfileData) {
  await apiPut(`/users/${id}`, data);
}

export async function getUserById(id: number): Promise<User> {
  return await apiGet(`/users/${id}`);
}
