
import bcrypt from 'bcrypt';
import { SignupForm, LoginForm } from "../interfaces/auth.interface";
import * as userRepository from '../repositories/user.repository';
import { User } from "../interfaces/user.interface";
import httpStatus from 'http-status';

export const signup = async (signupForm: SignupForm): Promise<User> => {
  signupForm.password = await bcrypt.hash(signupForm.password, 10);
  return userRepository.create(signupForm);
};

export const login = async (loginForm: LoginForm): Promise<User | undefined> => {
  const user = await userRepository.findByEmail(loginForm.email);
  if (user) {
    const isValidPassword = await bcrypt.compare(loginForm.password, user.password);
    if (isValidPassword) return user;
    throw {
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Invalid email or password',
    }
  }
}