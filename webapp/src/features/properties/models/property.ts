export interface GeoLocation {
  type: 'POINT';
  coordinates: number[];
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
