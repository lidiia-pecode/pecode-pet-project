'use client'

import { useState } from 'react';

export const useAlert = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const success = (msg: string) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
  };

  const error = (msg: string) => {
    setErrorMessage(msg);
    setShowError(true);
  };

  return {
    successMessage,
    errorMessage,
    showSuccess,
    showError,
    setShowSuccess,
    setShowError,
    success,
    error,
  };
};
