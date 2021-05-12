import { Property, PropertyDto } from '../interfaces/property.interface';

export const toPropertyDto = (property: Property): PropertyDto => {
  return {
    id: property.id,
    name: property.name,
    description: property.description,
    floorAreaSize: property.floorAreaSize,
    price: property.price,
    rooms: property.rooms,
    available: property.available,
    geolocation: property.geolocation,
    realtorId: property.realtorId,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt,
  };
};
