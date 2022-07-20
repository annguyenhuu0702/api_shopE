import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { RegisterDto, typeAuth,  } from "../types/auth";
import { db } from "../utils/db.server";
import * as argon from "argon2";
import { ResponseErrorType, ResponseType } from "../types/common";
import {Response} from 'express'

dotenv.config();

export const register = async (body: RegisterDto, res: Response) : Promise<ResponseType<typeAuth> | ResponseErrorType> => {
  try {
    const { email, password, fullname } = body;
    const checkUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (checkUser) {
      return {
        status: 403,
        data: { message: "Email already is exists" },
      };
    }
    const hash = await argon.hash(password);
    const user = await db.user.create({
      data: {
        email,
        hash,
        fullname,
      },
    });
    const { hash: _hash, ...other } = user;
    const access_token = createAccessToken({
      id: user.id
    })

    const refresh_token = createRefreshToken({
      id: user.id
    })

    res.cookie("AT", refresh_token,{
      sameSite: "strict",
      httpOnly: true,
      secure: false
    })

    return {
      status: 200,
      data: { user: other, access_token: access_token },
    };
  } catch (error) {
    console.log(error)
    return {
      status : 500,
      data: {message : "Lỗi rồi"}
    }
  }
};

const createAccessToken = (obj : any) => {
  const access_token = jwt.sign(obj, process.env.AT || "super-serect", {
    expiresIn: "1h",
  });
  return access_token;
};

const createRefreshToken = (obj : any) => {
  const refresh_token = jwt.sign(obj, process.env.RF || "super-serect", {
    expiresIn: "360h",
  });
  return refresh_token;
};
