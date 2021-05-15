/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import passport from 'passport';

import { router } from './routes';
import { HttpError } from './interfaces/error.interface';
import { setupPassport } from './middlewares/auth.middleware';

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const app = express();
const debugLog: debug.IDebugger = debug('app');
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

// Automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));

setupPassport();
app.use(passport.initialize());

app.use('/', router);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  debugLog(err);
  return res.status(err.statusCode || err.status || 500).json(err);
});

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
