import { Stack } from '@mui/material';
import { NavLink } from './NavLink';

interface NavbarProps {
  direction?: 'row' | 'column';
  spacing?: number;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Weather', href: '/weather' },
  { label: 'About', href: '/about' },
];

export const Navbar = ({ direction = 'row', spacing = 3 }: NavbarProps) => {
  return (
    <Stack
      direction={direction}
      spacing={spacing}
      sx={{
        display: direction === 'row' ? { xs: 'none', md: 'flex' } : 'flex',
      }}
    >
      {navLinks.map(link => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </Stack>
  );
};
