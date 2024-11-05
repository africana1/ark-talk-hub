import express, { Router } from 'express';
import config from '../modules/config/config';
import { speakerRoute } from '../modules/speaker';
import { attendeeRoute } from '../modules/attendee';
import { adminRoute } from '../modules/admin';
import { talkRoute } from '../modules/talk';

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
  {
    path: '/attendees',
    route: attendeeRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/talks',
    route: talkRoute,
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
