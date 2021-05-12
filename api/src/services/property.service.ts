import { Property, PropertyForm } from '../interfaces/property.interface';
import * as propertyRepository from '../repositories/property.repository';
import { User, Role } from '../interfaces/user.interface';

export const getAll = async (user: User): Promise<Property[]> => {
  const where = ({
    CLIENT: {
      available: true,
    },
    REALTOR: {
      realtorId: user.id,
    },
    ADMIN: {},
  } as { [key in Role]: {} })[user.role];

  return propertyRepository.findAllWhere(where);
};

export const add = async (property: PropertyForm): Promise<Property> => {
  return propertyRepository.create(property);
};

export const update = async (id: number, property: PropertyForm): Promise<Property> => {
  return propertyRepository.update(id, property);
};

export const getById = async (id: number): Promise<Property | undefined> => {
  return propertyRepository.findById(id);
};

export const remove = async (id: number): Promise<number> => {
  return propertyRepository.remove(id);
};
