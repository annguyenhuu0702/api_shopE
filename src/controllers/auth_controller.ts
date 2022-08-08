import { Request, Response } from "express";
import {
  changeProfile,
  getProfile,
  login,
  refreshToken,
  register,
} from "../services/auth_services";

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
    res.status(201).json({ message: "Success" });
  },
  refreshToken: async (req: Request, res: Response) => {
    const { data, status } = await refreshToken(req);
    return res.status(status).json(data);
  },
  getProfile: async (req: Request, res: Response) => {
    const { status, data } = await getProfile(res.locals.user);
    return res.status(status).json(data);
  },
  changeProfile: async (req: Request, res: Response) => {
    const { data, status } = await changeProfile(req.body, res.locals.user);
    return res.status(status).json(data);
  },
};
