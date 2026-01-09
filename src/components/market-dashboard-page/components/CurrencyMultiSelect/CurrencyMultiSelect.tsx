'use client';

import { useState, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAssetPairs } from '@/hooks/market-dashboard/useAssetPairs';
import { getSortedItemsByQuery } from '@/lib/utils';
import { styles } from './CurrencyMultiSelect.styles';

interface CurrencyMultiSelectProps {
  selected: string[];
  onChange: (v: string[]) => void;
  max?: number;
}

export const CurrencyMultiSelect = ({
  selected,
  onChange,
  max = 5,
}: CurrencyMultiSelectProps) => {
  const { data: symbols = [] } = useAssetPairs();
  const [search, setSearch] = useState('');

  const filteredSymbols = useMemo(
    () => getSortedItemsByQuery(symbols, search),
    [symbols, search]
  );

  return (
    <Autocomplete
      multiple
      options={filteredSymbols}
      value={selected}
      onChange={(_, newValue) => {
        if (newValue.length <= max) onChange(newValue);
      }}
      disableCloseOnSelect
      filterSelectedOptions
      getOptionDisabled={option =>
        selected.length >= max && !selected.includes(option)
      }
      inputValue={search}
      onInputChange={(_, value, reason) => {
        if (reason === 'input') setSearch(value);
      }}
      disableClearable
      size='small'
      renderInput={params => (
        <TextField
          {...params}
          label='Select currencies'
          placeholder={`Choose up to ${max}...`}
        />
      )}
      sx={styles.autocomplete}
    />
  );
};
