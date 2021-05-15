export interface SignupForm {
  name: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'REALTOR';
}

export interface SignupResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'REALTOR';
}
