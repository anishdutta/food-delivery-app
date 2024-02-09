import express, { Router } from 'express';
import validate from '../../modules/validate/validate.middleware';
import { ResturantValidator, resturantController } from '../../modules/resturant';

const router: Router = express.Router();

router.get('/get', validate(ResturantValidator.getResturants), resturantController.get);
router.post('/add', validate(ResturantValidator.addResturant), resturantController.add);

export default router;