'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { ViewMode } from '@/types/Product';

interface SwitcherProps {
  mode: ViewMode;
  onSwitchMode: (value: ViewMode) => void;
}

export const ViewModeSwitcher = ({ mode, onSwitchMode }: SwitcherProps) => {
  const handleChange = (_: unknown, newMode: ViewMode) => {
    onSwitchMode(newMode);
    localStorage.setItem('productViewMode', newMode);
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      size='small'
      color='primary'
    >
      <ToggleButton value='grid'>
        <GridViewIcon />
      </ToggleButton>

      <ToggleButton value='list'>
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
