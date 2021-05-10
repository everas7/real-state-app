export type RoleForSignup = 'CLIENT' | 'REALTOR';

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
