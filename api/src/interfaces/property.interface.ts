import { UserDto, User } from './user.interface';

export interface GeoLocation {
  type: 'POINT';
  coordinates: number[];
}

export interface GeoLocationDto {
  latitude: number;
  longitude: number;
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
  realtor?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyDto extends Omit<Property, 'geolocation' | 'realtor'> {
  geolocation: GeoLocationDto;
}
export interface PropertyDetailedDto extends PropertyDto {
  realtor: UserDto;
}

export type PropertyForm = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minFloorAreaSize?: number;
  maxFloorAreaSize?: number;
  rooms?: number[];
}
