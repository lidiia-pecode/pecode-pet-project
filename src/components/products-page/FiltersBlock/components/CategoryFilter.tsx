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
import { deleteCategory } from '@/lib/api/products/categories';
import { useAlert } from '@/hooks/useAlert';
import { Alerts } from '@/components/shared/FormAlert';
import { useState } from 'react';
import { DeleteButton } from '../../../shared/DeleteButton/DeleteButton';

export const CategoryFilter = () => {
  const { data: categories, isLoading, refetch } = useCategories();
  console.log('Categories loaded:', categories);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };
  const alert = useAlert();

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

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      refetch();
      alert.success('Category deleted!');
    } catch (err) {
      alert.error('Failed to delete category');
      console.log(err);
      setOpen(false);
    } finally {
      setLoading(false);
    }
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
        {isLoading ? (
          <CategoryFilterSkeleton />
        ) : (
          categories?.map(category => (
            <Box
              key={category.id}
              sx={categoryFilterStyles.categoryItem}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => handleChange(category.slug)}
                  />
                }
                label={category.name}
              />

              <DeleteButton
                open={open}
                loading={loading}
                productCategory={category.name}
                toggleOpen={toggleOpen}
                handleDelete={() => handleDelete(category.id)}
              />
            </Box>
          ))
        )}
      </FormGroup>

      <Alerts {...alert} />
    </Box>
  );
};
