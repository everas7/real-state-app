export enum RoleForSignup {
  Realtor = 2,
  Client = 3,
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  role: RoleForSignup;
}

export interface SignupResponse {
  name: string;
  email: string;
  role: RoleForSignup;
}

export interface LoginForm {
  email: string;
  password: string;
}
