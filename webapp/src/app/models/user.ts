import { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
export interface Realtor extends User {
  role: Role.Realtor;
}

export interface IUserForm
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'> {
  id?: number;
  password?: string;
}
