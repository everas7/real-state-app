import {
  Property,
  PropertyForm,
  PropertyFilters,
} from '../interfaces/property.interface';
import * as propertyRepository from '../repositories/property.repository';
import * as userRepository from '../repositories/user.repository';
import { User } from '../interfaces/user.interface';
import { Op } from 'sequelize';
import { RoleEnum } from '../interfaces/role.interface';
import { Pagination, PaginatedResult } from '../interfaces/custom.interface';

export const getAll = async (
  user: User,
  filters: PropertyFilters,
  pagination: Pagination
): Promise<PaginatedResult<Property>> => {
  let where = (
    {
      [RoleEnum.Client]: {
        available: true,
      },
      [RoleEnum.Realtor]: {
        realtorId: user.id,
      },
      [RoleEnum.Admin]: {},
    } as { [key in RoleEnum]: {} }
  )[user.roleId];
  where = {
    ...where,
    ...(filters.minPrice || filters.maxPrice
      ? {
          price: {
            ...(filters.minPrice ? { [Op.gte]: filters.minPrice } : {}),
            ...(filters.maxPrice ? { [Op.lte]: filters.maxPrice } : {}),
          },
        }
      : {}),
    ...(filters.minFloorAreaSize || filters.maxFloorAreaSize
      ? {
          floorAreaSize: {
            ...(filters.minFloorAreaSize
              ? { [Op.gte]: filters.minFloorAreaSize }
              : {}),
            ...(filters.maxFloorAreaSize
              ? { [Op.lte]: filters.maxFloorAreaSize }
              : {}),
          },
        }
      : {}),
    ...(filters.rooms
      ? {
          rooms: {
            [Op.or]: {
              [Op.or]: filters.rooms,
              ...(filters.rooms.some((r) => +r === 4)
                ? {
                    [Op.gte]: 4,
                  }
                : {}),
            },
          },
        }
      : {}),
  };

  return propertyRepository.findAllWhere(where, pagination);
};

export const add = async (property: PropertyForm): Promise<Property> => {
  const user = await userRepository.findById(property.realtorId);
  if (!user) {
    throw {
      status: 400,
      message: 'Realtor does not exist',
    };
  }
  if (user?.roleId !== RoleEnum.Realtor) {
    throw {
      status: 400,
      message: 'Properties can only be assigned to realtors',
    };
  }
  return propertyRepository.create(property);
};

export const update = async (
  id: number,
  property: PropertyForm
): Promise<Property> => {
  const user = await userRepository.findById(property.realtorId);
  if (!user) {
    throw {
      status: 400,
      message: 'Realtor does not exist',
    };
  }
  if (user?.roleId !== RoleEnum.Realtor) {
    throw {
      status: 400,
      message: 'Properties can only be assigned to realtors',
    };
  }
  return propertyRepository.update(id, property);
};

export const getById = async (id: number): Promise<Property | undefined> => {
  return propertyRepository.findById(id);
};

export const remove = async (id: number): Promise<number> => {
  return propertyRepository.remove(id);
};
