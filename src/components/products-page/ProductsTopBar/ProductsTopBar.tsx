import { Box, Button } from '@mui/material';
import { ActiveFiltersBar } from '../shared/ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { useResponsive } from '@/hooks/useResponsive';
import { useProductsStore } from '@/store/productsStore';
import { topBarStyles } from './ProductsTopBar.styles';


export const ProductsTopBar = () => {
  const { isTablet } = useResponsive();
  const {openMobileFilters} = useProductsStore();

  return (
    <>
      <Box sx={topBarStyles.searchBarContainer}>
        <SearchBar />
        <SortSelect />
      </Box>

      <Box sx={topBarStyles.filtersSidebarStyles}>
        <Box sx={topBarStyles.filtersBarInner}>
          {isTablet ? (
            <Button variant='outlined' onClick={openMobileFilters}>
              Filters
            </Button>
          ) : (
            <ActiveFiltersBar />
          )}
          <Box sx={topBarStyles.viewModeSwitcherContainer}>
            <ViewModeSwitcher />
          </Box>
        </Box>
      </Box>
    </>
  );
};
