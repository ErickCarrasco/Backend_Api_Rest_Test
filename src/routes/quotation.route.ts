
import QuotationController from '../controllers/quotation.controller';
import {Router} from 'express';
import auth from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/create/quotation', auth, QuotationController.createQuotation);


export default router;

