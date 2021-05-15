import { request } from '../../../services/axios';
import {
  Property,
  PropertyForList,
  IPropertyForm,
  IPropertyFilters,
} from '../models/property';

const filtersP = new URLSearchParams({
  price: '',
});

export const Properties = {
  list: (params: URLSearchParams | null = null): Promise<PropertyForList[]> =>
    request.get(
      'properties',
      params
    ),
  get: (id: number): Promise<Property> => request.get(`properties/${id}`),
  update: (id: number, property: IPropertyForm): Promise<Property> =>
    request.put(`properties/${id}`, property),
};
