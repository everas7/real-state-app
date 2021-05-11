import { request } from '../../../services/axios';
import { LoginForm, LoginResponse } from '../models/login';
import { SignupForm, SignupResponse } from '../models/signup';

export const Access = {
  login: (form: LoginForm): Promise<LoginResponse> =>
    request.post('login', form),
  signup: (form: SignupForm): Promise<SignupResponse> =>
    request.post('signup', form),
};
