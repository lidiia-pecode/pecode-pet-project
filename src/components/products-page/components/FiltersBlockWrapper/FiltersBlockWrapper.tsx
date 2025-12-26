'use client';

import { Box, Drawer } from '@mui/material';

import { styles } from './FiltersBlockWrapper.styles';
import { useProductsStore } from '@/store/productsStore';
import { FiltersBlock } from './components/FiltersBlock';

export const FiltersBlockWrapper = () => {
  const filtersOpened = useProductsStore(state => state.filtersOpened);
  const closeFilters = useProductsStore(state => state.closeFilters);

  return (
    <>
      <Drawer
        open={filtersOpened}
        onClose={closeFilters}
        anchor='left'
        slotProps={{ paper: { sx: styles.drawerPaper } }}
        sx={styles.drawer}
      >
        <FiltersBlock />
      </Drawer>

      <Box sx={styles.sidebar}>
        <FiltersBlock />
      </Box>
    </>
  );
};
