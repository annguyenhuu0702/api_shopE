import { Request, Response } from "express";
import {
  changeEmail,
  changePassword,
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
  changePassword: async (req: Request, res: Response) => {
    const { data, status } = await changePassword(req.body, res.locals.user);
    return res.status(status).json(data);
  },
  changeEmail: async (req: Request, res: Response) => {
    const { data, status } = await changeEmail(req.body, res.locals.user);
    return res.status(status).json(data);
  },
};
