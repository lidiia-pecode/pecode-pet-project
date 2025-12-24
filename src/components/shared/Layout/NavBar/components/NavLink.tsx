'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SxProps, Theme, Box } from '@mui/material';
import { navLink } from '../Navbar.styles';

interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const sx: SxProps<Theme> = {
    ...navLink.base,
    ...(isActive ? navLink.active : {}),
  };

  return (
    <Box component={Link} href={href} sx={sx}>
      {label}
    </Box>
  );
};
