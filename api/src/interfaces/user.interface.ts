import { RoleEnum } from './role.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: RoleEnum;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFilters {
  role?: RoleEnum;
}

export interface UserForm
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'roleId'> {
  role: RoleEnum;
}

export interface UserDto extends Omit<User, 'password' | 'roleId'> {
  role: RoleEnum;
}
