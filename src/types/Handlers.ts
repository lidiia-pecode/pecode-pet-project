import { ProductFilters, FilterKey, Category } from './Filters';
import { SortOption } from './sortOptions';

export interface ProductHandlers {
  handleFilterChange: (updates: Partial<ProductFilters>) => void;
  handleSortChange: (sort: SortOption) => void;
  handlePageChange: (_: unknown, page: number) => void;
  handleClearFilters: () => void;
  removeFilter: (type: FilterKey, value?: Category) => void;
}
