'use client';

import { useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { styles } from './CategoryFilter.styles';
import { CategorySlug } from '@/types/Categories';
import { useProductsStore } from '@/store/productsStore';
import {
  useCategories,
  useDeleteCategory,
} from '@/hooks/categories/useCategories';
import { useModalToggle } from '@/hooks/ui/useModal';
import { CategoryFormWrapper } from '../CategoryFormWrapper';
import { CategoryFilterSkeleton } from '../CategoryFilterSkeleton';
import { ActionButton } from '@/components/shared/ActionButton';
import { DeleteButton } from '@/components/shared/DeleteButton';

export const CategoryFilter = () => {
  const { data: categories, isLoading } = useCategories();
  const syncCategories = useProductsStore(state => state.syncCategories);

  const { isOpen, toggle } = useModalToggle();
  const deleteMutation = useDeleteCategory();

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

  useEffect(() => {
    if (categories) {
      const slugs = categories.map(c => c.slug);
      syncCategories(slugs);
    }
  }, [categories, syncCategories]);

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography variant='subtitle1' sx={styles.title} gutterBottom>
          Categories
        </Typography>

        <ActionButton
          mode='create'
          entityName='Category'
          icon={<AddIcon fontSize='small' />}
          open={isOpen}
          size='small'
          onToggle={toggle}
          form={<CategoryFormWrapper onClose={toggle} />}
        />
      </Box>

      <FormGroup sx={styles.formGroup}>
        {isLoading ? (
          <CategoryFilterSkeleton />
        ) : (
          categories?.map(category => (
            <Box key={category.id} sx={styles.categoryItem}>
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
                entityName={category.name}
                entityType='category'
                loading={deleteMutation.isPending}
                onConfirm={async () => {
                  await deleteMutation.mutateAsync(category.id);
                }}
              />
            </Box>
          ))
        )}
      </FormGroup>
    </Box>
  );
};
