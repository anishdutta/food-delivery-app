import express, { Router } from 'express';
import authRoute from './auth.routes';
import resturantRoute from './restaurant.routes'

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/Restaurant',
    route: resturantRoute,
  }
];


defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;