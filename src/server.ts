import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const createServer = () => {
  const app: Application = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get('/health', (req: Request, res: Response) => {
    res.json({ ok: true });
  });
  return app;
};
