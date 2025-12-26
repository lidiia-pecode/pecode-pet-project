'use client';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { styles } from './ProductsTopBar.styles';
import { useProductsStore } from '@/store/productsStore';
import { useModalToggle } from '@/hooks/products/useModal';

import { ActiveFiltersBar } from '../ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { ProductFormWrapper } from '@/components/shared/ProductFormWrapper';
import { ActionButton } from '@/components/shared/ActionButton';


export const ProductsTopBar = () => {
  const openFilters = useProductsStore(state => state.openFilters);
  const { isOpen, toggle } = useModalToggle();

  return (
    <>
      <Box sx={styles.searchBarContainer}>
        <SearchBar />
        <SortSelect />
      </Box>

      <Box sx={styles.filtersBarOuter}>
        <Box sx={styles.filtersBarInner}>
          <Button
            variant='outlined'
            onClick={openFilters}
            sx={styles.filtersButton}
          >
            Filters
          </Button>

          <ActionButton
            mode='create'
            entityName='Product'
            icon={<AddIcon fontSize='small' />}
            open={isOpen}
            onToggle={toggle}
            form={<ProductFormWrapper onClose={toggle} showCategory />}
          />

          <Box sx={styles.activeFiltersBarContainer}>
            <ActiveFiltersBar />
          </Box>

          <Box sx={styles.viewModeSwitcherContainer}>
            <ViewModeSwitcher />
          </Box>
        </Box>
      </Box>
    </>
  );
};
