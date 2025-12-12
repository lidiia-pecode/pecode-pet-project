export interface AlertController {
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
  setShowSuccess: (show: boolean) => void;
  setShowError: (show: boolean) => void;
}
