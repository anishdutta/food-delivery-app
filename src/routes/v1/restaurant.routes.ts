import express, { Router } from 'express';
import validate from '../../modules/validate/validate.middleware';
import { ResturantValidator, resturantController } from '../../modules/restaurant';

const router: Router = express.Router();

router.get('/get', validate(ResturantValidator.getRestaurants), resturantController.get);
router.post('/add', validate(ResturantValidator.addRestaurant), resturantController.add);

export default router;