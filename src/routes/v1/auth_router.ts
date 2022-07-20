import {Router} from 'express'
import {auth_controller} from '../../controllers/auth_controller'

const router = Router();

router.post("/register", auth_controller.register);

export default router