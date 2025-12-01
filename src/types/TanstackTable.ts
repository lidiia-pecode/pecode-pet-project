import { RowSelectionState, SortingState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface TableStateProps {
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;

  columnVisibility?: Record<string, boolean>;
  setColumnVisibility?: Dispatch<SetStateAction<Record<string, boolean>>>;

  columnOrder?: string[];
  setColumnOrder?: Dispatch<SetStateAction<string[]>>;

  pageSelections?: Record<number, RowSelectionState>;
  setPageSelection?: (page: number, selection: RowSelectionState) => void;

  page?: number;
  pageSize?: number;
}

export type ColumnMeta = {
  align?: 'flex-start' | 'center';
  pin?: boolean;
};
