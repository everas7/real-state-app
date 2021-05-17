import express, { RequestHandler } from 'express';

import { userRouter } from './user.route';
import { authRouter } from './auth.route';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { propertyRouter } from './property.route';

export const router = express.Router();

const routes = [
  {
    path: '/users',
    route: userRouter,
    authenticate: true,
  },
  {
    path: '/properties',
    route: propertyRouter,
    authenticate: true,
  },
  {
    path: '/',
    route: authRouter,
  },
];

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Welcome to Test Project API');
});

routes.forEach((route) => {
  router.use(
    ...(
      [
        route.path,
        route.authenticate ? authenticateJwt : null,
        route.route,
      ] as RequestHandler[]
    ).filter((r) => r)
  );
});
