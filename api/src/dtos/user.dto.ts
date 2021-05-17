import { User, UserDto, UserForm } from '../interfaces/user.interface';
import { UserCreationAttributes } from '../models/user.model';

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const fromUserFormToUserCreationAttributes = (
  user: UserForm
): UserCreationAttributes => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    roleId: user.role,
  };
};
