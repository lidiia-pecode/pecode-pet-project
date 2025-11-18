import * as styles from '../styles/ProductPage.styles';

import { Box, Button } from '@mui/material';

import { ProductFilters } from '@/types/Filters';
import { ProductQuery } from '@/types/Query';
import { ProductHandlers } from '@/types/Handlers';
import { ViewMode } from '@/types/Product';

import { ActiveFiltersBar } from '../ui/ActiveFiltersBar';
import { SearchBar } from './components/SearchBar';
import { SortSelect } from './components/SortSelect';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';

interface TopBarProps {
  filters: ProductFilters;
  query: ProductQuery;
  isTablet: boolean;
  currentMode: ViewMode;
  handlers: ProductHandlers;
  toggleMobileFilters: () => void;
  setViewMode: (mode: ViewMode) => void;
}

export const TopBar = ({
  filters,
  handlers,
  query,
  isTablet,
  currentMode,
  toggleMobileFilters,
  setViewMode,
}: TopBarProps) => {
  return (
    <>
      <Box sx={styles.searchBarContainerStyles}>
        <SearchBar
          searchQuery={filters.searchQuery ?? ''}
          onChangeQuery={handlers.handleFilterChange}
        />
        <SortSelect sort={query.sort} onChange={handlers.handleSortChange} />
      </Box>

      <Box sx={styles.filtersBarContainerStyles}>
        <Box sx={styles.filtersBarInnerStyles}>
          {isTablet ? (
            <Button variant='outlined' onClick={toggleMobileFilters}>
              Filters
            </Button>
          ) : (
            <ActiveFiltersBar
              filters={filters}
              removeFilter={handlers.removeFilter}
              handleClearFilters={handlers.handleClearFilters}
            />
          )}
          <Box sx={styles.viewModeSwitcherContainerStyles}>
            <ViewModeSwitcher mode={currentMode} onSwitchMode={setViewMode} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
