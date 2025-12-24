import {
  Code,
  Palette,
  Cloud,
  Package,
  Map,
  BarChart3,
  Store,
  Shield,
} from 'lucide-react';

export interface Feature {
  title: string;
  icon: string;
  description: string;
  chips: string[];
}

export const features: Feature[] = [
  {
    title: 'Homepage & Authentication',
    icon: '🔐',
    description: 'Login system with role-based access for users and admins.',
    chips: [
      'User login',
      'Admin authentication',
      'Role-based access',
      'Protected routes',
    ],
  },
  {
    title: 'Product Catalog',
    icon: '🛍',
    description: 'Browse and manage products in table or card views.',
    chips: [
      'Table & Card view',
      'Sorting & Filtering',
      'Search',
      'Category management',
    ],
  },
  {
    title: 'Weather Dashboard',
    icon: '🌤',
    description:
      'Interactive dashboard showing weather forecasts and metrics for any location.',
    chips: [
      'Forecast charts',
      'Interactive map',
      'Multiple metrics',
      'Real-time data',
    ],
  },
];

export interface Technology {
  name: string;
  icon: React.ElementType;
}

export const technologies: Technology[] = [
  { name: 'Next.js', icon: Code },
  { name: 'Material UI', icon: Palette },
  { name: 'React Query', icon: Cloud },
  { name: 'TanStack Table', icon: Package },
  { name: 'MapLibre', icon: Map },
  { name: 'Recharts', icon: BarChart3 },
  { name: 'Zustand', icon: Store },
  { name: 'TypeScript', icon: Shield },
];
