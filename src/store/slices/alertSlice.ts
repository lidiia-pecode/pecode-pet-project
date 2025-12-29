import { StateCreator } from 'zustand';

export interface AlertState {
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;

  setSuccess: (msg: string) => void;
  setError: (msg: string) => void;
  reset: () => void;
}

export const createAlertSlice: StateCreator<AlertState> = set => ({
  successMessage: '',
  errorMessage: '',
  showSuccess: false,
  showError: false,

  setSuccess: (msg: string) =>
    set({ successMessage: msg, showSuccess: true, showError: false }),
  setError: (msg: string) =>
    set({ errorMessage: msg, showError: true, showSuccess: false }),
  reset: () =>
    set({
      successMessage: '',
      errorMessage: '',
      showSuccess: false,
      showError: false,
    }),
});
