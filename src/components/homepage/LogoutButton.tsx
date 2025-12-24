'use client';

import { useProductsStore } from '@/store/productsStore';
import { Button } from '@mui/material';
// import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const userRole = useProductsStore(state => state.role);
  // const router = useRouter();
  const setRole = useProductsStore(state => state.setRole);

  const handleLogout = () => {
    // await fetch('/api/auth/logout', { method: 'POST' });
    // router.refresh();
    setRole(null);
  };

  if (!userRole) {
    return null;
  }
  return (
    <Button variant='contained' color='secondary' onClick={handleLogout}>
      Logout
    </Button>
  );
}
