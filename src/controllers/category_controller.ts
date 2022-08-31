import { Request, Response } from "express";
import { category_service } from "../services/category_services";

export const category_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await category_service.getAll(req.query);
    return res.status(status).json(data);
  },
  create: async (req: Request, res: Response) => {
    const { status, data } = await category_service.create(req.body);
    return res.status(status).json(data);
  },
  update: async (req: Request, res: Response) => {
    const { data, status } = await category_service.update(
      req.body,
      req.params.id
    );
    return res.status(status).json(data);
  },
  delete: async (req: Request, res: Response) => {
    const { data, status } = await category_service.delete(req.params.id);
    return res.status(status).json(data);
  },
};
