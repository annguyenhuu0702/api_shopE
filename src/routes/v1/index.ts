import {Router} from 'express'
import authRouter from './auth_router'

const router = Router()

router.use("/api/auth",authRouter)



export default router