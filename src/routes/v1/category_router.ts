import { Router } from "express";
import { category_controller } from "../../controllers/category_controller";

const router = Router();

router.post("/api/category", category_controller.create);

export default router;
