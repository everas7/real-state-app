import { UserDto } from "./user.interface";

export interface GeoLocation {
  type: 'POINT';
  coordinates: number[];
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
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyDto extends Property {}
export interface PropertyDetailedDto extends Property {
  realtor: UserDto;
}

export interface PropertyForm
  extends Omit<Property, 'id' | 'createdAt' | 'updatedAt'> {}
