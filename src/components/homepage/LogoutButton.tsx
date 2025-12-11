'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  return (
    <Button variant='contained' color='secondary' onClick={handleLogout}>
      Logout
    </Button>
  );
}
