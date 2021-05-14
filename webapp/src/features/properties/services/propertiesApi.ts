import { request } from '../../../services/axios';
import { Property, PropertyForList, PropertyForm } from '../models/property';

export const Properties = {
  list: (): Promise<PropertyForList[]> => request.get('properties'),
  get: (id: number): Promise<Property> => request.get(`properties/${id}`),
  update: (id: number, property: PropertyForm): Promise<Property> =>
    request.put(`properties/${id}`, property),
};
