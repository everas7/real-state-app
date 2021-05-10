import express from 'express';

import { userRouter } from './user.route';
import { authRouter } from './auth.route';
import { authenticateUser } from '../middlewares/auth.middleware';

export const router = express.Router();

const routes = [
  {
    path: '/users',
    route: userRouter,
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
    ...[
      route.path,
      route.authenticate ? authenticateUser : null,
      route.route,
    ].filter((r) => r)
  );
});
