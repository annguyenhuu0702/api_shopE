import { Request, Response } from "express"
import { register } from "../services/auth_services"

export const auth_controller = {
  register: async (req: Request, res: Response) => {
    const {data,status} = await register(req.body,res)
    return res.status(status).json(data)
  }
}


