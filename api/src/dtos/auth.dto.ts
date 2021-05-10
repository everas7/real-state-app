import { User } from "../interfaces/user.interface";
import { SignupResponse, RoleForSignup } from "../interfaces/auth.interface";

export const toSignupResponseDto = (user: User ): SignupResponse => {
  return {
    name: user.name,
    email: user.email,
    role: user.role as RoleForSignup,
  }
}
