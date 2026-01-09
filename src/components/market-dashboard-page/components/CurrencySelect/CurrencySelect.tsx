'use client';

import { useState, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { styles } from './CurrencySelect.styles';
import { useAssetPairs } from '@/hooks/market-dashboard/useAssetPairs';
import { getSortedItemsByQuery } from '@/lib/utils';


interface CurrencySelectProps {
  currency: string;
  onChange: (value: string) => void;
}

export const CurrencySelect = ({ currency, onChange }: CurrencySelectProps) => {
  const { data: symbols = [] } = useAssetPairs();
  const [inputValue, setInputValue] = useState('');

  const filteredSymbols = useMemo(
    () => getSortedItemsByQuery(symbols, inputValue),
    [symbols, inputValue]
  );

  return (
    <Autocomplete
      options={filteredSymbols}
      value={currency}
      onChange={(_, newValue) => onChange(newValue || '')}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      size='small'
      autoHighlight
      openOnFocus
      disablePortal
      sx={styles.autocomplete}
      renderInput={params => (
        <TextField
          {...params}
          label='Select currency'
          placeholder={currency ? '' : 'Search...'}
        />
      )}
    />
  );
};
