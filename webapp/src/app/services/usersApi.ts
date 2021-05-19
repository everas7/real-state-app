import { request } from './axios';
import { IUserForm, User } from '../models/user';

export const Users = {
  me: (): Promise<User> => request.get('/users/me'),
  list: (params?: URLSearchParams): Promise<User[]> =>
    request.get('/users', params),
  get: (id: number): Promise<User> => request.get(`/users/${id}`),
  updateMe: (user: IUserForm): Promise<User> =>
    request.patch(`/users/me`, user),
  update: (id: number, user: IUserForm): Promise<User> =>
    request.patch(`users/${id}`, user),
  create: (user: IUserForm): Promise<User> => request.post(`users`, user),
  delete: (id: number): Promise<number> => request.del(`users/${id}`),
};
