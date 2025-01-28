
import {Router} from 'express'
import { getUsers, createUser } from '../controllers/userController.js';
import { errorHandler } from '../Middlewares/errorHandler.js';

const router = Router();


router.get('/', errorHandler,getUsers);
router.post('/', errorHandler,createUser);

export default router;
