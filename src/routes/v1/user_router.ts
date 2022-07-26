import { Router } from "express";
import { user_controller } from "../../controllers/user_controller";

const router = Router();

router.post("/create", user_controller.create);
router.get("/getAll", user_controller.getAll);

export default router;
