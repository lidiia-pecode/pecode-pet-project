import { apiPost } from '../fetcher';

interface RegisterUserBody {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export async function registerUser(
  body: RegisterUserBody
): Promise<RegisterUserResponse> {
  const fullBody = {
    ...body,
    role: 'admin',
    avatar: 'https://example.com/default-avatar.png',
  };

  return apiPost<RegisterUserResponse, typeof fullBody>('/users', fullBody);
}
