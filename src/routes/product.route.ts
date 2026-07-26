import productController from '../controllers/product.controller';
import {Router} from 'express';
import auth from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/get/available', auth, productController.getAllProducts);


export default router;

