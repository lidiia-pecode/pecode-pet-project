'use client';

import { Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';

interface NavbarProps {
  direction?: 'row' | 'column';
  spacing?: number;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export const Navbar = ({ direction = 'row', spacing = 3 }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <Stack direction={direction} spacing={spacing}>
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
