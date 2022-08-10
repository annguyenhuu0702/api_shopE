import { Router } from "express";
import { auth_controller } from "../../controllers/auth_controller";
import { authMiddlewares } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);
router.post("/logout", auth_controller.logout);
router.get(
  "/getProfile",
  authMiddlewares.loginRequire,
  auth_controller.getProfile
);
router.put(
  "/changeProfile",
  authMiddlewares.loginRequire,
  auth_controller.changeProfile
);
router.put(
  "/changePassword",
  authMiddlewares.loginRequire,
  auth_controller.changePassword
);
router.put(
  "/changeEmail",
  authMiddlewares.loginRequire,
  auth_controller.changeEmail
);

router.post("/refreshToken", auth_controller.refreshToken);

export default router;
