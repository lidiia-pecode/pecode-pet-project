'use client';

import { Snackbar, Alert } from '@mui/material';
import { useProductsStore } from '@/store/productsStore';

export const Alerts = () => {
  const successMessage = useProductsStore(state => state.successMessage);
  const errorMessage = useProductsStore(state => state.errorMessage);
  const showSuccess = useProductsStore(state => state.showSuccess);
  const showError = useProductsStore(state => state.showError);
  const reset = useProductsStore(state => state.reset);

  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={reset}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='success' variant='filled' onClose={reset}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={reset}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='error' variant='filled' onClose={reset}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
