import { request } from '../../../services/axios';
import { PropertyForList } from '../models/property';

export const Properties = {
  list: (): Promise<PropertyForList[]> =>
    request.get('properties'),
};
