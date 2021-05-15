import { request } from '../../../services/axios';
import {
  Property,
  PropertyForList,
  IPropertyForm,
  IPropertyFilters,
} from '../models/property';

export const Properties = {
  list: (filters: IPropertyFilters | null = null): Promise<PropertyForList[]> =>
    request.get('properties'),
  get: (id: number): Promise<Property> => request.get(`properties/${id}`),
  update: (id: number, property: IPropertyForm): Promise<Property> =>
    request.put(`properties/${id}`, property),
};
