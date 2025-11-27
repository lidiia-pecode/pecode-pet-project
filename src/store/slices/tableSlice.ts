import { StateCreator } from 'zustand';
import {
  ColumnOrderState,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';

export interface TableState {
  pageSelections: Record<number, RowSelectionState>;
  columnVisibility: VisibilityState;
  columnOrder: ColumnOrderState;

  setPageSelection: (page: number, selection: RowSelectionState) => void;
  setColumnVisibility: (
    updater: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => void;
  setColumnOrder: (
    updater: ColumnOrderState | ((old: ColumnOrderState) => ColumnOrderState)
  ) => void;
}

export const createTableSlice: StateCreator<TableState> = set => ({
  columnVisibility: {},
  pageSelections: {},
  columnOrder: [],

  setPageSelection: (page, selection) =>
    set(state => ({
      pageSelections: { ...state.pageSelections, [page]: selection },
    })),

  setColumnVisibility: updater =>
    set(state => ({
      columnVisibility:
        typeof updater === 'function'
          ? updater(state.columnVisibility)
          : updater,
    })),
  setColumnOrder: updater =>
    set(state => ({
      columnOrder:
        typeof updater === 'function' ? updater(state.columnOrder) : updater,
    })),
});
