import { apiPost } from '@/lib/api/fetcher';
import { NextResponse } from 'next/server';

interface AuthRequestBody {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const data = await apiPost<AuthResponse, AuthRequestBody>('/auth/login', {
      email,
      password,
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60,
    });
    res.cookies.set('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (err: unknown) {
    console.error('Login error:', err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 401 }
    );
  }
}
