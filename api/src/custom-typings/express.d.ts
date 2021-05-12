import { Property } from '../interfaces/property.interface';
import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      property?: Property;
    }
  }
}
