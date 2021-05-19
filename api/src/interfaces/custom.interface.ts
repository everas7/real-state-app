export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  count: number;
  rows: T[];
}