import { BehaviorSubject, Observable } from 'rxjs';

interface DataGridState<T> {
  displayData: T[]; // Data currently displayed on the page
  fullData: T[];    // All data, before pagination
  pageCount: number;
  itemOffset: number;
  itemsPerPage: number;
  sortColumn: keyof T | null;
  sortDirection: 'asc' | 'desc' | null;
}

class CustomDataGridService<T> {
  private dataSubject: BehaviorSubject<DataGridState<T>>;

  constructor(initialData: T[] = [], itemsPerPage: number = 10) {
    this.dataSubject = new BehaviorSubject<DataGridState<T>>({
      displayData: initialData.slice(0, itemsPerPage),
      fullData: initialData,
      pageCount: Math.ceil(initialData.length / itemsPerPage),
      itemOffset: 0,
      itemsPerPage: itemsPerPage,
      sortColumn: null,
      sortDirection: null,
    });
  }

  public getDataGridState(): Observable<DataGridState<T>> {
    return this.dataSubject.asObservable();
  }

  public setData(newData: T[], itemOffset: number = 0) {
    const currentState = this.dataSubject.getValue();
    const newItemsPerPage = currentState.itemsPerPage;
    const newPageCount = Math.ceil(newData.length / newItemsPerPage);

    // Apply current sorting to new data
    const sortedData = this.applySort(newData, currentState.sortColumn, currentState.sortDirection);

    this.dataSubject.next({
      displayData: sortedData.slice(itemOffset, itemOffset + newItemsPerPage),
      fullData: sortedData, // Store the full, sorted data
      pageCount: newPageCount,
      itemOffset: itemOffset,
      itemsPerPage: newItemsPerPage,
      sortColumn: currentState.sortColumn,
      sortDirection: currentState.sortDirection,
    });
  }

  public setItemOffset(newOffset: number) {
    const currentState = this.dataSubject.getValue();
    const { fullData, itemsPerPage } = currentState; // Use fullData for slicing
    const newPageCount = Math.ceil(fullData.length / itemsPerPage);

    this.dataSubject.next({
      ...currentState,
      displayData: fullData.slice(newOffset, newOffset + itemsPerPage),
      pageCount: newPageCount,
      itemOffset: newOffset,
    });
  }

  public setItemsPerPage(newItemsPerPage: number) {
    const currentState = this.dataSubject.getValue();
    const { fullData, itemOffset } = currentState; // Use fullData for slicing
    const newPageCount = Math.ceil(fullData.length / newItemsPerPage);

    this.dataSubject.next({
      ...currentState,
      displayData: fullData.slice(itemOffset, itemOffset + newItemsPerPage),
      pageCount: newPageCount,
      itemOffset: itemOffset, // Keep current offset, display data will adjust
      itemsPerPage: newItemsPerPage,
    });
  }

  public setSort(column: keyof T) {
    const currentState = this.dataSubject.getValue();
    let newSortDirection: 'asc' | 'desc' | null = 'asc';
    if (currentState.sortColumn === column && currentState.sortDirection === 'asc') {
      newSortDirection = 'desc';
    } else if (currentState.sortColumn === column && currentState.sortDirection === 'desc') {
      newSortDirection = null; // Cycle to no sort
    }

    const sortedData = this.applySort(currentState.fullData, column, newSortDirection);
    const newItemsPerPage = currentState.itemsPerPage;
    const newPageCount = Math.ceil(sortedData.length / newItemsPerPage);

    this.dataSubject.next({
      displayData: sortedData.slice(0, newItemsPerPage), // Reset to first page after sort
      fullData: sortedData,
      pageCount: newPageCount,
      itemOffset: 0, // Reset offset to 0
      itemsPerPage: newItemsPerPage,
      sortColumn: newSortDirection ? column : null,
      sortDirection: newSortDirection,
    });
  }

  private applySort(data: T[], column: keyof T | null, direction: 'asc' | 'desc' | null): T[] {
    if (!column || !direction) {
      return [...data]; // Return a shallow copy if no sort
    }

    return [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      // Handle Date objects for sorting
      if (aValue instanceof Date && bValue instanceof Date) {
        const aTime = aValue.getTime();
        const bTime = bValue.getTime();
        return direction === 'asc' ? aTime - bTime : bTime - aTime;
      }
      // Fallback for other types or mixed types
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

export default CustomDataGridService;
