import { Router } from "express";
import { categoryType_controller } from "../../controllers/categoryType_controller";
import { authMiddlewares } from "../../middlewares/authMiddleware";

const router = Router();
router.get("/getAll", categoryType_controller.getAll);

router.post(
  "/create",
  authMiddlewares.verifyAdmin,
  categoryType_controller.create
);
router.put(
  "/update",
  authMiddlewares.verifyAdmin,
  categoryType_controller.update
);
router.delete(
  "/delete/:id",
  authMiddlewares.verifyAdmin,
  categoryType_controller.delete
);

export default router;
