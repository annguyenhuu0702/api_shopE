import {Router} from 'express'
import authRouter from './auth_router'
import categoryRouter from './category_router'

const router = Router()

router.use("/api/auth",authRouter)
router.use("/api/category",categoryRouter)



export default router