export enum RoleEnum  {
  Admin = 1,
  Realtor = 2,
  Client= 3,
};

export interface Role {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
