import { Router } from "express";
import { auth_controller } from "../../controllers/auth_controller";

const router = Router();

router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);
router.post("/logout", auth_controller.logout);

export default router;
