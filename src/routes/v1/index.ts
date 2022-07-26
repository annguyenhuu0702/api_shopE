import { Router } from "express";
import authRouter from "./auth_router";
import categoryRouter from "./category_router";
import userRouter from "./user_router";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/category", categoryRouter);
router.use("/api/user", userRouter);

export default router;
