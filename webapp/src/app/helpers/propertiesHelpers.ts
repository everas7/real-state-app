import { IPropertyFilters } from '../models/property';

export const formatQueryParams = (
  filters: IPropertyFilters,
  defaultFilters: IPropertyFilters,
  pageSize: number,
  nextPage: number
) => {
  const params = new URLSearchParams();
  params.append('filters[minPrice]', String(filters.price.min));
  if (filters.price!.max !== defaultFilters.price.max) {
    params.append('filters[maxPrice]', String(filters.price.max));
  }
  params.append('filters[minFloorAreaSize]', String(filters.floorAreaSize.min));
  if (filters.floorAreaSize!.max !== defaultFilters.floorAreaSize.max) {
    params.append(
      'filters[maxFloorAreaSize]',
      String(filters.floorAreaSize.max)
    );
  }
  Array.from(filters.rooms).forEach((room) => {
    params.append('filters[rooms][]', String(room));
  });
  params.append('page', String(nextPage));
  params.append('pageSize', String(pageSize));
  return params;
};
