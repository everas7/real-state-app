import express from 'express';

import * as exampleController from '../controllers/example.controller';

export const exampleRouter = express.Router();

exampleRouter.get('/', exampleController.get);
