'use client';

import { Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <Stack direction='row' spacing={3}>
      {navLinks.map(link => (
        <NavLink
          key={link.href}
          href={link.href}
          isActive={pathname === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </Stack>
  );
};
