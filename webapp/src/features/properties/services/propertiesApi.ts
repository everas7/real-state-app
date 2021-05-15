import { request } from '../../../app/services/axios';
import {
  Property,
  PropertyForList,
  IPropertyForm,
} from '../../../app/models/property';

export const Properties = {
  list: (params?: URLSearchParams): Promise<PropertyForList[]> =>
    request.get('properties', params),
  get: (id: number): Promise<Property> => request.get(`properties/${id}`),
  update: (id: number, property: IPropertyForm): Promise<Property> =>
    request.put(`properties/${id}`, property),
  create: (property: IPropertyForm): Promise<Property> =>
    request.post(`properties`, property),
  delete: (id: number): Promise<Property> => request.del(`properties/${id}`),
};
