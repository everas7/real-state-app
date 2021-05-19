import { UserDto, User } from './user.interface';
import { Photo } from './photo.interface';

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
  photos?: Photo[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyDto extends Omit<Property, 'geolocation' | 'realtor' | 'photos'> {
  geolocation: GeoLocationDto;
  photo: string | null;
}
export interface PropertyDetailedDto extends Omit<PropertyDto, 'photo'> {
  realtor: UserDto;
  photos?: Photo[];
}

export type PropertyForm = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minFloorAreaSize?: number;
  maxFloorAreaSize?: number;
  rooms?: number[];
}
