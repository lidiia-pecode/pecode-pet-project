'use client';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { CATEGORIES, Category } from '@/types/Filters';

interface CategoryFilterProps {
  selected: Category[];
  onChange: (category: Category) => void;
}

export const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => {
  return (
    <Box>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {CATEGORIES.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                size='small'
                checked={selected.includes(category)}
                onChange={() => onChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
