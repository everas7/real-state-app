import { request } from '../../../app/services/axios';
import { LoginForm, LoginResponse } from '../../../app/models/login';
import { SignupForm, SignupResponse } from '../../../app/models/signup';

export const Access = {
  login: (form: LoginForm): Promise<LoginResponse> =>
    request.post('login', form),
  signup: (form: SignupForm): Promise<SignupResponse> =>
    request.post('signup', form),
};
