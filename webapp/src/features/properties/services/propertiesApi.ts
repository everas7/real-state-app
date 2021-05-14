import { request } from '../../../services/axios';
import { Property, PropertyForList } from '../models/property';

export const Properties = {
  list: (): Promise<PropertyForList[]> =>
    request.get('properties'),
  get: (id: number): Promise<Property> =>
    request.get(`properties/${id}`),
};
