import * as userRepository from '../repositories/user.repository';
import { User, UserFilters, UserForm } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import { fromUserFormToUserCreationAttributes } from '../dtos/user.dto';
import { RoleEnum } from '../interfaces/role.interface';
import httpStatus from 'http-status';

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  return userRepository.findByEmail(email);
};

export const getById = async (id: number): Promise<User | undefined> => {
  return userRepository.findById(id);
};

export const getAll = async (filters: UserFilters): Promise<User[]> => {
  let where = {};
  where = {
    ...(filters.role
      ? {
          roleId: filters.role,
        }
      : {}),
  };
  return userRepository.findAllWhere(where);
};

export const add = async (user: UserForm): Promise<User> => {
  user.password = await bcrypt.hash(user.password, 10);
  return userRepository.create(fromUserFormToUserCreationAttributes(user));
};

export const update = async (id: number, user: UserForm): Promise<User> => {
  const userToUpdate = await getById(id);
  if (!userToUpdate) {
    throw {
      status: 404,
      message: 'User not found',
    };
  }
  user.password = user.password
    ? await bcrypt.hash(user.password, 10)
    : userToUpdate.password;

  return userRepository.update(id, {
    ...userToUpdate,
    ...fromUserFormToUserCreationAttributes(user),
  });
};

export const updateCurrent = async (
  id: number,
  user: UserForm
): Promise<User> => {
  const userToUpdate = await getById(id);
  if (!userToUpdate) {
    throw {
      status: httpStatus.BAD_REQUEST,
      message: 'User not found',
    };
  }

  if (userToUpdate.roleId !== RoleEnum.Admin) {
    if (user.role && user.role !== userToUpdate.roleId) {
      throw {
        status: httpStatus.FORBIDDEN,
        message: 'User does not have permission to perform this action',
      };
    }
  }

  user.password = user.password
    ? await bcrypt.hash(user.password, 10)
    : userToUpdate.password;

  return userRepository.update(id, {
    ...userToUpdate,
    ...fromUserFormToUserCreationAttributes(user),
  });
};

export const remove = async (id: number): Promise<number> => {
  return userRepository.remove(id);
};
