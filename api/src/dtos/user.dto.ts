import { User, UserDto } from '../interfaces/user.interface';

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
