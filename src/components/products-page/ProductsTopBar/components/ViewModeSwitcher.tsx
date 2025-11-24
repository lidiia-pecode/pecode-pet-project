'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { ViewMode } from '@/types/Product';
import { useProductsStore } from '@/store/productsStore';
import { useResponsive } from '@/hooks/useResponsive';
import { useEffect } from 'react';

export const ViewModeSwitcher = () => {
  const { isMobile } = useResponsive();
  const viewMode = useProductsStore(state => state.viewMode);
  const setViewMode = useProductsStore(state => state.setViewMode);
  
  const handleChange = (_: unknown, newMode: ViewMode | null) => {
    if (newMode) setViewMode(newMode);
  };

  useEffect(() => {
    if (isMobile && viewMode !== 'grid') {
      setViewMode('grid');
    }
  }, [isMobile, setViewMode, viewMode]);

  return (
    <ToggleButtonGroup
      value={viewMode}
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
