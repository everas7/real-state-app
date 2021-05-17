import { User, UserForm } from '../interfaces/user.interface';
import {
  SignupResponse,
  RoleForSignup,
  SignupForm,
} from '../interfaces/auth.interface';
import { RoleEnum } from '../interfaces/role.interface';
import { UserCreationAttributes } from '../models/user.model';

export const toSignupResponseDto = (user: User): SignupResponse => {
  return {
    name: user.name,
    email: user.email,
    role: user.roleId as unknown as RoleForSignup,
  };
};

export const fromSignupFormToUserCreationAttributes = (user: SignupForm): UserCreationAttributes => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    roleId: user.role as unknown as RoleEnum,
  };
};
