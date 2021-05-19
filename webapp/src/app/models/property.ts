import { Realtor } from './user';

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface PropertyForList {
  id: number;
  name: string;
  description: string;
  floorAreaSize: number;
  price: number;
  rooms: number;
  available: boolean;
  geolocation: GeoLocation;
  address: string;
  realtorId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Property {
  id: number;
  name: string;
  description: string;
  floorAreaSize: number;
  price: number;
  rooms: number;
  available: boolean;
  geolocation: GeoLocation;
  address: string;
  realtorId: number;
  realtor: Realtor;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPropertyForm
  extends Omit<
    Property,
    'id' | 'realtor' | 'createdAt' | 'updatedAt' | 'geolocation'
  > {
  id?: number;
  realtor?: Realtor;
  geolocation: GeoLocation | null;
}


export interface IPropertyFilters {
  price: {
    min: number;
    max: number;
  };
  floorAreaSize: {
    min: number;
    max: number;
  };
  rooms: Set<number>;
}