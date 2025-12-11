export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || 'Login failed');
  }

  return res.json();
}
