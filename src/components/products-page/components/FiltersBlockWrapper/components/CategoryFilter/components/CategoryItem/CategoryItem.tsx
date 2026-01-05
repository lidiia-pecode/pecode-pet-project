'use client';


import { memo } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { Category } from '@/types/Categories';
import { DeleteButton } from '@/components/shared/DeleteButton';
import { styles } from './CategoryItem.styles';

interface CategoryItemProps {
  category: Category;
  isSelected: boolean;
  isDeleting: boolean;
  onToggle: (slug: string) => void;
  onDelete: (id: number, slug: string) => Promise<void>;
}

export const CategoryItem = memo(
  ({
    category,
    isSelected,
    isDeleting,
    onToggle,
    onDelete,
  }: CategoryItemProps) => {
    return (
      <Box sx={styles.categoryItem}>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={isSelected}
              onChange={() => onToggle(category.slug)}
            />
          }
          label={category.name}
        />

        <DeleteButton
          entityName={category.name}
          entityType='category'
          loading={isDeleting}
          onConfirm={() => onDelete(category.id, category.slug)}
        />
      </Box>
    );
  }
);

CategoryItem.displayName = 'CategoryItem';
