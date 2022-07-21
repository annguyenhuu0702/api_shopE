import { Request, Response } from "express";
import { category_service } from "../services/category_services";

export const category_controller = {
  create: async (req: Request, res: Response) => {
    const { status, data } = await category_service.create(req.body);
    return res.status(status).json(data);
  },
};
