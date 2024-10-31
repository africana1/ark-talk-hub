import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 200, message: 'Server online' });
});

export { app };
