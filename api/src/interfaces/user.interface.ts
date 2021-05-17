export type Role = 'CLIENT' | 'REALTOR' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFilters {
  role?: Role;
}

export type UserForm = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserDto = Omit<User, 'password'>;
