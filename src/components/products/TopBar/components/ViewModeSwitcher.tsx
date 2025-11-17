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
  const handleChange = (_: unknown, newMode: ViewMode | null) => {
    if (newMode) onSwitchMode(newMode);
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      size='small'
      color='primary'
      aria-label='view mode'
    >
      <ToggleButton value='grid' aria-label='grid view'>
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value='list' aria-label='list view'>
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
