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

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
