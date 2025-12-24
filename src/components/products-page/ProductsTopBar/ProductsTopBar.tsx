'use client';

import { Box, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { useProductsStore } from '@/store/productsStore';
import { topBarStyles } from './ProductsTopBar.styles';
import AddIcon from '@mui/icons-material/Add';

import { ProductFormWrapper } from './components/ProductFormWrapper';
import { ActionButton } from '@/components/shared/ActionButton';
import { useModalToggle } from '@/hooks/products/useModal';

export const ProductsTopBar = () => {
  const openFilters = useProductsStore(state => state.openFilters);
  const { isOpen, toggle } = useModalToggle();

  return (
    <>
      <Box sx={topBarStyles.searchBarContainer}>
        <SearchBar />
        <SortSelect />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={topBarStyles.filtersBarInner}>
          <Button
            variant='outlined'
            onClick={openFilters}
            sx={topBarStyles.filtersButton}
          >
            Filters
          </Button>

          <ActionButton
            mode='create'
            entityName='Product'
            icon={<AddIcon fontSize='small' />}
            open={isOpen}
            onToggle={toggle}
            form={<ProductFormWrapper onClose={toggle} />}
          />

          <Box sx={topBarStyles.activeFiltersBarContainer}>
            <ActiveFiltersBar />
          </Box>

          <Box sx={topBarStyles.viewModeSwitcherContainer}>
            <ViewModeSwitcher />
          </Box>
        </Box>
      </Box>
    </>
  );
};
