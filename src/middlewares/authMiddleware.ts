import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const authMiddlewares = {
  loginRequire: (req: Request, res: Response, next: NextFunction): any => {
    const reqHeader = req.headers["authorization"];
    if (reqHeader) {
      const accessToken = reqHeader.split(" ")[1];
      if (accessToken) {
        try {
          const user = jwt.verify(accessToken, process.env.AT || "mickey");
          res.locals.user = user;
          next();
          return;
        } catch (error) {
          console.log(error);
        }
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  },
};
