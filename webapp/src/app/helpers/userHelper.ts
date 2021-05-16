import { Role } from '../models/user';

export const mapRoleAsString = (role: Role) => {
  return {
    CLIENT: 'Client',
    REALTOR: 'Realtor',
    ADMIN: 'Admin',
  }[role];
};
