import { Role } from '../models/role';

export const mapRoleAsString = (role: Role) => {
  return {
    [Role.Client]: 'Client',
    [Role.Realtor]: 'Realtor',
    [Role.Admin]: 'Admin',
  }[role];
};
