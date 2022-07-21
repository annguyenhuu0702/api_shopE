import { Request, Response } from "express";
import { login, register } from "../services/auth_services";

export const auth_controller = {
  register: async (req: Request, res: Response) => {
    const { data, status } = await register(req.body, res);
    return res.status(status).json(data);
  },
  login: async (req: Request, res: Response) => {
    const { data, status } = await login(req.body, res);
    return res.status(status).json(data);
  },
  logout: async (req: Request, res: Response) => {
    res.clearCookie("REFRESH_TOKEN");
    res.status(201).json({ message: "ok" });
  },
};
