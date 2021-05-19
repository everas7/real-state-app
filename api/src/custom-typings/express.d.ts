import { Property } from '../interfaces/property.interface';
import { Request } from 'express';
import { Photo } from '../interfaces/photo.interface';

declare global {
  namespace Express {
    export interface Request {
      property?: Property;
    }
  }
}
