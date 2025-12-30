'use client';

import { useState, useCallback } from 'react';

export const useModalToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, toggle };
};
