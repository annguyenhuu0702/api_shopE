import { Request, Response } from "express";
import { user_services } from "../services/user_services";

export const user_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await user_services.create(req.body);
    return res.status(status).json(data);
  },
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await user_services.getAll(req.query);
    return res.status(status).json(data);
  },
};