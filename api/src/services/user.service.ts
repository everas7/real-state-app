import * as userRepository from '../repositories/user.repository';
import { User, UserFilters, UserForm } from '../interfaces/user.interface';

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
          role: filters.role,
        }
      : {}),
  };
  return userRepository.findAllWhere(where);
};


export const add = async (user: UserForm): Promise<User> => {
  return userRepository.create(user);
};

export const update = async (id: number, user: UserForm): Promise<User> => {
  return userRepository.update(id, user);
};

export const remove = async (id: number): Promise<number> => {
  return userRepository.remove(id);
};
