'use client';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Skeleton,
} from '@mui/material';
import { getCategories } from '@/lib/api/categories';
import { useQuery } from '@tanstack/react-query';
import { CategorySlug } from '@/types/Categories';
import { useProductsStore } from '@/store/productsStore';

export const CategoryFilter = () => {
  const { data: categories, isLoading } = useQuery({
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

      <FormGroup sx={{minHeight: 200}}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                sx={{ display: 'flex', alignItems: 'center', m: 1, ml: 0 }}
              >
                <Skeleton
                  variant='rectangular'
                  width={16}
                  height={16}
                  sx={{ mr: 1 }}
                />
                <Skeleton variant='text' width='50%' />
              </Box>
            ))
          : categories?.map(category => (
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
