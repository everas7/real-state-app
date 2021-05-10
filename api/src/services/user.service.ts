
import * as userRepository from '../repositories/user.repository';
import { User } from '../interfaces/user.interface';

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  return userRepository.findByEmail(email);
};

export const getAll = async (): Promise<User[]> => {
  return userRepository.findAll();
}
