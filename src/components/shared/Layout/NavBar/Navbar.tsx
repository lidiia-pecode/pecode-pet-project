import { Stack } from '@mui/material';
import { NavLink } from './components/NavLink';
import { navbar } from './Navbar.styles';

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
      sx={direction === 'row' ? navbar.containerRow : navbar.containerColumn}
    >
      {navLinks.map(link => (
        <NavLink key={link.href} href={link.href} label={link.label} />
      ))}
    </Stack>
  );
};
