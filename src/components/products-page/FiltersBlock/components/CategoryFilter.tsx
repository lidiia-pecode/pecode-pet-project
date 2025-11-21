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
import { useProductsStore } from '@/store/productsStore';

export const CategoryFilter = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });

  const selectedCategories = useProductsStore(
    state => state.filters.categories
  );
  const updateFilters = useProductsStore(state => state.updateFilters);

  const handleChange = (category: CategorySlug) => {
    const isSelected = selectedCategories.includes(category);
    const updated = isSelected
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    updateFilters({ categories: updated });
  };

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
                checked={selectedCategories.includes(category.slug)}
                onChange={() => handleChange(category.slug)}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
