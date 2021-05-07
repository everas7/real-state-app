import express from 'express';

import { exampleRouter } from './example.route';

export const router = express.Router();

const routes = [
  {
    path: '/example',
    route: exampleRouter,
  },
];

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Welcome to Test Project API')
});

routes.forEach((route) => {
  router.use(route.path, route.route);
});
