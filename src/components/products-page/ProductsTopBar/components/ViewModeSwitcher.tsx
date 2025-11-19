'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { ViewMode } from '@/types/Product';
import { useProductsStore } from '@/store/productsStore';
import { useResponsive } from '@/hooks/useResponsive';

export const ViewModeSwitcher = () => {
  const { isMobile } = useResponsive();
  const { viewMode, setViewMode } = useProductsStore();

  const mode = isMobile ? 'grid' : viewMode;
  
  const handleChange = (_: unknown, newMode: ViewMode | null) => {
    if (newMode) setViewMode(newMode);
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      size='small'
      color='primary'
      aria-label='view mode'
    >
      <ToggleButton value='grid' aria-label='grid view'>
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value='list' aria-label='list view'>
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
