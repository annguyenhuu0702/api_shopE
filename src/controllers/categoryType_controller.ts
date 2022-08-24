import { Request, Response } from "express";
import { categoryType_service } from "../services/categoryType_services";

export const categoryType_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await categoryType_service.getAll(req.query);
    return res.status(status).json(data);
  },
  create: async (req: Request, res: Response) => {
    const { data, status } = await categoryType_service.create(req.body);
    return res.status(status).json(data);
  },
  update: async (req: Request, res: Response) => {
    const { data, status } = await categoryType_service.update(
      req.body,
      req.params.id
    );
    return res.status(status).json(data);
  },
  delete: async (req: Request, res: Response) => {
    const { data, status } = await categoryType_service.delete(req.params.id);
    return res.status(status).json(data);
  },
};
