'use client';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { CategorySlug } from '@/types/Categories';
import { useProductsStore } from '@/store/productsStore';
import { useCategories } from '@/hooks/categories/useCategories';
import { categoryFilterStyles } from '../FiltersBlock.styles';
import { CategoryFilterSkeleton } from './CategoryFilterSkeleton';

export const CategoryFilter = () => {
  const { data: categories, isLoading } = useCategories();

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
      <Typography
        variant='subtitle1'
        sx={categoryFilterStyles.title}
        gutterBottom
      >
        Categories
      </Typography>

      <FormGroup sx={categoryFilterStyles.formGroup}>
        {isLoading
          ? <CategoryFilterSkeleton />
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
