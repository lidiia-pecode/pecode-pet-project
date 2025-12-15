'use client';

import { AlertController} from '@/types/Alert';
import { Snackbar, Alert } from '@mui/material';

export const FormAlerts = ({
  successMessage,
  errorMessage,
  showSuccess,
  showError,
  setShowSuccess,
  setShowError,
}: AlertController) => {
  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity='success'
          variant='filled'
          onClose={() => setShowSuccess(false)}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setShowError(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
