import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

import * as authServices from '../services/auth.service';
import * as userServices from '../services/user.service';
import httpStatus from 'http-status';

export const setupPassport = () => {
  passport.use(
    'signup',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req: Request, email: string, password: string, done: Function) => {
        try {
          const user = await authServices.signup(req.body);
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await authServices.login({
            email,
            password,
          });
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new passportJwt.Strategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}

export const validateSameEmailDoesntExist = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getUserByEmail(req.body.email);
  if (user) {
      res.status(httpStatus.BAD_REQUEST).send({ message: `User email already exists` });
  } else {
      next();
  }
}

export const authenticateUser = passport.authenticate('jwt', { session: false });

