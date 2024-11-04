import express, { Request, Response, Application } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import config from './modules/config/config';
import { rateLimit } from './modules/utils';
import { morgan } from './modules/logger';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { ApiError, errorConverter, errorHandler } from './modules/errors';
import routes from './routes';

const app: Application = express();

// request logging
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());
app.disable('x-powered-by');

// enable cors
app.options('*', cors()); // Handle preflight requests first
app.use(cors()); // Enable CORS globally for all routes

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression({ level: 6, threshold: 0 }));

if (config.env === 'production') {
  app.use(rateLimit);
}

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: httpStatus.OK, message: 'Server online' });
});

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const handler = serverless(app);
export { handler };
