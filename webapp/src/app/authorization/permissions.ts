import { Role } from '../models/role';

export const Permissions = {
  Users: {
    List: {
      PageAccess: [Role.Admin],
    },
    Detail: {
      PageAccess: [Role.Admin],
    },
    Create: {
      PageAccess: [Role.Admin],
    },
    Edit: {
      PageAccess: [Role.Admin],
    },
    Delete: {
      PageAccess: [Role.Admin],
    },
  },
  Properties: {
    List: {
      PageAccess: [Role.Admin, Role.Realtor, Role.Client],
      AddButton: [Role.Admin, Role.Realtor],
    },
    Detail: {
      PageAccess: [Role.Admin, Role.Realtor, Role.Client],
      ManageAction: [Role.Admin, Role.Realtor],
    },
    Create: {
      PageAccess: [Role.Admin, Role.Realtor],
      RealtorField: [Role.Admin],
    },
    Edit: {
      PageAccess: [Role.Admin, Role.Realtor],
    },
    Delete: {
      Action: [Role.Admin, Role.Realtor],
    },
  },
};
