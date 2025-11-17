'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

interface NavLinkProps extends Omit<MuiLinkProps, 'href'> {
  href: string;
}

const StyledLink = styled(MuiLink, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  textDecoration: 'none',
  fontWeight: 500,
  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
  borderBottom: isActive
    ? `2px solid ${theme.palette.primary.main}`
    : '2px solid transparent',
  transition: 'color 0.2s, border-bottom 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <StyledLink
        ref={ref}
        component={Link}
        href={href}
        isActive={isActive}
        {...props}
      />
    );
  }
);

NavLink.displayName = 'NavLink';
