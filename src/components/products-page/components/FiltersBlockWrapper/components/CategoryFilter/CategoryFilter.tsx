'use client';

import { useEffect, useCallback, useState } from 'react';
import { Box, Typography, FormGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { styles } from './CategoryFilter.styles';
import { Category, CategorySlug } from '@/types/Categories';
import { useProductsStore } from '@/store/productsStore';
import {
  useCategories,
  useDeleteCategory,
} from '@/hooks/categories/useCategories';
import { useModalToggle } from '@/hooks/ui/useModal';
import { CategoryFormWrapper } from '../CategoryFormWrapper';
import { CategoryFilterSkeleton } from '../CategoryFilterSkeleton';
import { ActionButton } from '@/components/shared/ActionButton';
import { BulkDeleteButton } from '@/components/shared/BulkDeleteButton';
import { CategoryItem } from './components/CategoryItem';
import { useGlobalStore } from '@/store/globalStore';

export const CategoryFilter = () => {
  const { data: categories, isLoading } = useCategories();
  const syncCategories = useProductsStore(state => state.syncCategories);
  const selectedCategories = useProductsStore(
    state => state.filters.categories
  );
  const updateFilters = useProductsStore(state => state.updateFilters);

  const { isOpen, toggle } = useModalToggle();
  const deleteMutation = useDeleteCategory();
  const setError = useGlobalStore(state => state.setError);
  const setSuccess = useGlobalStore(state => state.setSuccess);
  const [deletingCategoryIds, setDeletingCategoryIds] = useState(
    new Set<number>()
  );

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

  const handleDeleteCategory = useCallback(
    async (id: number, slug: CategorySlug) => {
      setDeletingCategoryIds(prev => new Set(prev).add(id));
      try {
        await deleteMutation.mutateAsync({ id });
        updateFilters({
          categories: selectedCategories.filter(s => s !== slug),
        });
      } finally {
        setDeletingCategoryIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [deleteMutation, updateFilters, selectedCategories]
  );

  const handleBulkDelete = async () => {
    if (!categories?.length || !selectedCategories.length) return;

    const selected = categories.filter(c =>
      selectedCategories.includes(c.slug)
    );

    if (!selected.length) return;

    setDeletingCategoryIds(prev => new Set([...prev, ...selected.map(c => c.id)]));

    const results = await Promise.allSettled(
      selected.map(c => deleteMutation.mutateAsync({ id: c.id, showGlobalAlerts: false }))
    );

    const successfulCategories: Category[] = [];
    const failedCategories: Category[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successfulCategories.push(selected[index]);
      } else {
        failedCategories.push(selected[index]);
      }
    });
    
    if (successfulCategories.length > 0) {
      setSuccess(
        `Deleted categories: ${successfulCategories
          .map(c => `"${c.name}"`)
          .join(', ')}`
      );
    }

    if (failedCategories.length > 0) {
      setError(
        `Could not delete categories: ${failedCategories
          .map(c => `"${c.name}"`)
          .join(', ')}. They may contain products.`
      );
    }

    const succeededSlugsSet = new Set(successfulCategories.map(c => c.slug));
    updateFilters({
      categories: selectedCategories.filter(
        slug => !succeededSlugsSet.has(slug)
      ),
    });

    setDeletingCategoryIds(new Set());
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
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.slug)}
              isDeleting={deletingCategoryIds.has(category.id)}
              onToggle={toggleCategorySelection}
              onDelete={handleDeleteCategory}
            />
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
