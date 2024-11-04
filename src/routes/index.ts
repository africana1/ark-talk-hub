import express, { Router } from 'express';
import config from '../modules/config/config';
import { speakerRoute } from '../modules/speaker';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/speakers',
    route: speakerRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
