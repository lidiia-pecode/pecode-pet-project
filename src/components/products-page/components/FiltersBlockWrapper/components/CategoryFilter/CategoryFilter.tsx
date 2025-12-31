'use client';

import { useEffect, useCallback } from 'react';
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
import { BulkDeleteButton } from '@/components/shared/BulkDeleteButton';

export const CategoryFilter = () => {
  const { data: categories, isLoading } = useCategories();
  const syncCategories = useProductsStore(state => state.syncCategories);
  const selectedCategories = useProductsStore(
    state => state.filters.categories
  );
  const updateFilters = useProductsStore(state => state.updateFilters);

  const { isOpen, toggle } = useModalToggle();
  const deleteMutation = useDeleteCategory();

  useEffect(() => {
    if (categories) {
      syncCategories(categories.map(c => c.slug));
    }
  }, [categories, syncCategories]);

  const toggleCategorySelection = useCallback(
    (slug: CategorySlug) => {
      const updatedSelection = selectedCategories.includes(slug)
        ? selectedCategories.filter(s => s !== slug)
        : [...selectedCategories, slug];

      updateFilters({ categories: updatedSelection });
    },
    [selectedCategories, updateFilters]
  );

  const handleDeleteCategory = async (id: number, slug: CategorySlug) => {
    await deleteMutation.mutateAsync(id);
    updateFilters({
      categories: selectedCategories.filter(s => s !== slug),
    });
  };

  const handleBulkDelete = async () => {
    if (!categories?.length || !selectedCategories.length) return;

    const selected = categories.filter(c =>
      selectedCategories.includes(c.slug)
    );

    if (!selected.length) return;

    const results = await Promise.allSettled(
      selected.map(c => deleteMutation.mutateAsync(c.id))
    );

    const succeededSlugs = results
      .map((r, i) => (r.status === 'fulfilled' ? selected[i].slug : null))
      .filter(Boolean) as string[];

    updateFilters({
      categories: selectedCategories.filter(
        slug => !succeededSlugs.includes(slug)
      ),
    });
  };

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
                    onChange={() => toggleCategorySelection(category.slug)}
                  />
                }
                label={category.name}
              />

              <DeleteButton
                entityName={category.name}
                entityType='category'
                loading={deleteMutation.isPending}
                onConfirm={() =>
                  handleDeleteCategory(category.id, category.slug)
                }
              />
            </Box>
          ))
        )}
      </FormGroup>

      {selectedCategories.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <BulkDeleteButton onBulkDelete={handleBulkDelete} />
        </Box>
      )}
    </Box>
  );
};
