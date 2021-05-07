/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import { router } from './routes';

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const app = express();
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

app.use('/', router);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
