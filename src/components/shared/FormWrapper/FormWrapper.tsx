'use client';

import { ReactNode } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useAlert } from '@/hooks/useAlert';
import { Alerts } from '../Alerts/Alerts';
import { styles } from './FormWrapper.styles';

interface FormWrapperProps {
  title: string;
  onSubmit: () => void;
  onCancel?: () => void;
  children: ReactNode;
  isSubmitting?: boolean;
}

export const FormWrapper = ({
  title,
  onSubmit,
  onCancel,
  children,
  isSubmitting = false,
}: FormWrapperProps) => {
  const alert = useAlert();

  return (
    <>
      <Paper sx={styles.paper}>
        <Typography variant='h5' sx={styles.title}>
          {title}
        </Typography>

        <Box component='form' onSubmit={onSubmit} sx={styles.formContainer}>
          {children}
          <Box sx={styles.buttonsContainer}>
            {onCancel && (
              <Button variant='text' onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
            )}
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
      <Alerts {...alert} />
    </>
  );
};
