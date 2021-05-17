import { Role } from "./role";

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  role: Role.Client | Role.Realtor;
}

export interface SignupResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role.Client | Role.Realtor;
}
