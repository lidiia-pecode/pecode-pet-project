import { useCallback, useSyncExternalStore } from 'react';
import { ViewMode } from '@/types/Product';

const STORAGE_KEY = 'productViewMode';

let currentMode: ViewMode = 'grid';
const listeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    currentMode = saved === 'list' || saved === 'grid' ? saved : 'grid';
  } catch {
    currentMode = 'grid';
  }
}

const getSnapshot = (): ViewMode => currentMode;

const getServerSnapshot = (): ViewMode => 'grid';

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const setMode = (mode: ViewMode) => {
  currentMode = mode;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      console.error('[useViewMode] error saving to localStorage:', error);
    }
  }

  listeners.forEach(listener => listener());
};

export function useViewMode() {
  const viewMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setViewMode = useCallback((mode: ViewMode) => {
    setMode(mode);
  }, []);

  return {
    viewMode,
    setViewMode,
  };
}
