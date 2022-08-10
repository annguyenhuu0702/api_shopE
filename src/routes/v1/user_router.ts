import { Router } from "express";
import { user_controller } from "../../controllers/user_controller";
import { authMiddlewares } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/getAll", authMiddlewares.verifyAdmin, user_controller.getAll);
router.get(
  "/getById/:id",
  authMiddlewares.verifyAdmin,
  user_controller.getById
);
router.post("/create", authMiddlewares.verifyAdmin, user_controller.create);
router.put("/update/:id", authMiddlewares.verifyAdmin, user_controller.update);

export default router;
