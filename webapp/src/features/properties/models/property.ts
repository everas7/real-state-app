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
  extends Omit<Property, 'id' | 'realtor' | 'createdAt' | 'updatedAt'> {}

export type Role = 'CLIENT' | 'REALTOR' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
export interface Realtor extends User {
  role: 'CLIENT';
}


export interface IPropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minFloorAreaSize?: number;
  maxFloorAreaSize?: number;
  rooms?: number[];
}
