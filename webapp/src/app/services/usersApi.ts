import { request } from './axios';
import { User } from '../models/user';

export const Users = {
  me: (): Promise<User> => request.get('/users/me'),
};
