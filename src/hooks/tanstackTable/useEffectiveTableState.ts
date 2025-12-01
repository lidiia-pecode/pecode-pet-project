import { TableStateProps } from "@/types/TanstackTable";
import { RowSelectionState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export function useEffectiveTableState(
  stateProps?: TableStateProps,
  defaultPageSize = 5
) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const sorting = stateProps?.sorting ?? internalSorting;
  const setSorting = stateProps?.setSorting ?? setInternalSorting;

  const [internalColumnVisibility, setInternalColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const columnVisibility =
    stateProps?.columnVisibility ?? internalColumnVisibility;
  const setColumnVisibility =
    stateProps?.setColumnVisibility ?? setInternalColumnVisibility;

  const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>([]);
  const columnOrder = stateProps?.columnOrder ?? internalColumnOrder;
  const setColumnOrder = stateProps?.setColumnOrder ?? setInternalColumnOrder;

  const [internalPageSelections, setInternalPageSelections] = useState<
    Record<number, RowSelectionState>
  >(stateProps?.pageSelections || {});
  const pageSelections = stateProps?.pageSelections ?? internalPageSelections;
  const setPageSelection =
    stateProps?.setPageSelection ??
    ((page, sel) => {
      setInternalPageSelections(prev => ({ ...prev, [page]: sel }));
    });

  const [internalPage, setInternalPage] = useState<number>(
    stateProps?.page ?? 0
  );
  const page = stateProps?.page ?? internalPage;
  const setPage = stateProps?.page ? () => {} : setInternalPage; 

  const pageSize = stateProps?.pageSize ?? defaultPageSize;

  return {
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    columnOrder,
    setColumnOrder,
    pageSelections,
    setPageSelection,
    page,
    setPage,
    pageSize,
  };
}
