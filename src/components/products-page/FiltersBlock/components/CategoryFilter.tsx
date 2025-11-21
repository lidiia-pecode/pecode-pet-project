'use client';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { getCategories } from '@/lib/api/categories';
import { useQuery } from '@tanstack/react-query';
import { CategorySlug } from '@/types/Categories';

interface CategoryFilterProps {
  selected: CategorySlug[];
  onChange: (category: CategorySlug) => void;
}

export const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <Box>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {categories?.map(category => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                size='small'
                checked={selected.includes(category.slug)}
                onChange={() => onChange(category.slug)}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
