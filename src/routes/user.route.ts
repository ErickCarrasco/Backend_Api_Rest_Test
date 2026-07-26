
import UserController from '../controllers/user.controller';
import {Router} from 'express';
import auth from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/create/user/email', UserController.createUser);
router.post('/login/email', UserController.loginWithEmail);
router.post('/login/id', UserController.loginWithId);
router.post('/login/general', UserController.loginGeneral);
router.post('/change/password', auth, UserController.changePassword);
router.get('/one', auth, UserController.getLoggedUser);
router.get('/logout', auth, UserController.logout);
router.delete('/lowuser', auth, UserController.lowUser);


export default router;

