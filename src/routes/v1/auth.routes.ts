import express, { Router } from 'express';
import { authController, authValidation } from '../../modules/auth';
import validate from '../../modules/validate/validate.middleware';

const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

export default router;