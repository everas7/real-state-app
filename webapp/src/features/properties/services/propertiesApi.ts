import { request } from '../../../app/services/axios';
import {
  Property,
  PropertyForList,
  IPropertyForm,
} from '../../../app/models/property';
import { Paginated } from '../../../app/models/custom';

export const Properties = {
  list: (params?: URLSearchParams): Promise<Paginated<PropertyForList>> =>
    request.getPaginated('properties', params),
  get: (id: number): Promise<Property> => request.get(`properties/${id}`),
  update: (id: number, property: IPropertyForm): Promise<Property> =>
    request.put(`properties/${id}`, property),
  create: (property: IPropertyForm): Promise<Property> =>
    request.post(`properties`, property),
  uploadPhotos: (id: number, photos: FormData): Promise<Property> =>
    request.postForm(`properties/${id}/photos`, photos),
  delete: (id: number): Promise<number> => request.del(`properties/${id}`),
  deletePhotos: (id: number, params: URLSearchParams): Promise<number> =>
    request.del(`properties/${id}/photos`, params),
};
