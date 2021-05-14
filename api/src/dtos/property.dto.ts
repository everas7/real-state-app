import { Property, PropertyDto, PropertyDetailedDto } from '../interfaces/property.interface';
import { User } from '../interfaces/user.interface';
import { toUserDto } from './user.dto';

export const toPropertyDto = (property: Property): PropertyDto => {
  return {
    id: property.id,
    name: property.name,
    description: property.description,
    floorAreaSize: property.floorAreaSize,
    price: property.price,
    rooms: property.rooms,
    available: property.available,
    geolocation: {
      latitude: property.geolocation.coordinates[0],
      longitude: property.geolocation.coordinates[1],
    },
    address: property.address,
    realtorId: property.realtorId,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt,
  };
};

export const toPropertyDetailedDto = (property: Property, realtor?: User): PropertyDetailedDto => {
  return {
    id: property.id,
    name: property.name,
    description: property.description,
    floorAreaSize: property.floorAreaSize,
    price: property.price,
    rooms: property.rooms,
    available: property.available,
    geolocation: {
      latitude: property.geolocation.coordinates[0],
      longitude: property.geolocation.coordinates[1],
    },
    address: property.address,
    realtorId: property.realtorId,
    realtor: toUserDto(property.realtor || realtor!),
    createdAt: property.createdAt,
    updatedAt: property.updatedAt,
  };
};
