'use client';

import { useGlobalStore } from '@/store/globalStore';
import { Snackbar, Alert } from '@mui/material';

export const Alerts = () => {
  const successMessage = useGlobalStore(state => state.successMessage);
  const errorMessage = useGlobalStore(state => state.errorMessage);
  const showSuccess = useGlobalStore(state => state.showSuccess);
  const showError = useGlobalStore(state => state.showError);
  const reset = useGlobalStore(state => state.reset);

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
