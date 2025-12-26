'use client';

import { useState } from 'react';
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
import { deleteCategory } from '@/lib/api/products/categories';
import { useProductsStore } from '@/store/productsStore';
import { useCategories } from '@/hooks/categories/useCategories';
import { useAlert } from '@/hooks/useAlert';
import { useModalToggle } from '@/hooks/products/useModal';

import { CategoryFormWrapper } from '../CategoryFormWrapper';
import { CategoryFilterSkeleton } from '../CategoryFilterSkeleton';
import { ActionButton } from '@/components/shared/ActionButton';
import { DeleteButton } from '@/components/shared/DeleteButton';
import { Alerts } from '@/components/shared/Alerts';

export const CategoryFilter = () => {
  const { data: categories, isLoading, refetch } = useCategories();
  const { isOpen, toggle } = useModalToggle();

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
