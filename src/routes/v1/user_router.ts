import { Router } from "express";
import { user_controller } from "../../controllers/user_controller";

const router = Router();

router.get("/getAll", user_controller.getAll);
router.get("/getById/:id", user_controller.getById);
router.post("/create", user_controller.create);
router.put("/update/:id", user_controller.update);

export default router;
