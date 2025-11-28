import { useEffect, useState } from 'react';

export const useRangeFilter = (
  value: [number, number],
  commit: (v: [number, number]) => void
) => {
  const [localValue, setLocalValue] = useState(value);

  // synchronisation with global state for clearing filters
  useEffect(() => {
    setLocalValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value[0], value[1]]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    v: number | number[]
  ) => {
    setLocalValue(v as [number, number]);
  };

  const handleChangeCommitted = (
    _: Event | React.SyntheticEvent,
    v: number | number[]
  ) => {
    commit(v as [number, number]);
  };

  return { localValue, handleChange, handleChangeCommitted };
};
