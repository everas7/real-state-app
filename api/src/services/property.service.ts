import { Property, PropertyForm } from "../interfaces/property.interface";
import * as propertyRepository from '../repositories/property.repository';

export const getAll = async (): Promise<Property[]> => {
  return propertyRepository.findAll();
};

export const add = async(property: PropertyForm): Promise<Property> => {
  return propertyRepository.create(property);
}