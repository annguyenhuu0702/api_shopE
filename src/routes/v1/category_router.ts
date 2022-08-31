import { Router } from "express";
import { category_controller } from "../../controllers/category_controller";
import { authMiddlewares } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddlewares.verifyAdmin, category_controller.create);
router.get("/getAll", category_controller.getAll);
router.put(
  "/update/:id",
  authMiddlewares.verifyAdmin,
  category_controller.update
);
router.delete(
  "/delete/:id",
  authMiddlewares.verifyAdmin,
  category_controller.delete
);

export default router;
