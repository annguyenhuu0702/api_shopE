import * as argon from "argon2";
import * as dotenv from "dotenv";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { loginDto, registerDto, typeAuth } from "../types/auth";
import { ResponseErrorType, ResponseType } from "../types/common";
import { db } from "../utils/db.server";

dotenv.config();

export const register = async (
  body: registerDto,
  res: Response
): Promise<ResponseType<typeAuth> | ResponseErrorType> => {
  try {
    const { email, password, fullname } = body;
    const isEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (isEmail) {
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
    const userRole = await db.userRole.create({
      data: {
        userId: user.id,
        roleId: 3,
      },
      include: {
        role: true,
      },
    });
    const { hash: _hash, ...other } = user;
    const access_token = createAccessToken({
      id: user.id,
      role: userRole.role.name,
    });

    const refresh_token = createRefreshToken({
      id: user.id,
      role: userRole.role.name,
    });

    res.cookie("REFRESH_TOKEN", refresh_token, {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      status: 201,
      data: {
        data: { user: other, access_token: access_token },
        message: "ok",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: { message: "Lỗi rồi" },
    };
  }
};

export const login = async (
  body: loginDto,
  res: Response
): Promise<ResponseType<typeAuth> | ResponseErrorType> => {
  try {
    const { email, password } = body;
    const checkUser = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!checkUser) {
      return {
        status: 403,
        data: { message: "Email or password wrong!" },
      };
    }
    const isPassword = await argon.verify(checkUser.hash, password);
    if (!isPassword) {
      return {
        status: 403,
        data: { message: "Email or password wrong!" },
      };
    }
    const { hash: _hash, ...other } = checkUser;
    const access_token = createAccessToken({
      id: checkUser.id,
      role: checkUser.userRoles[0].role.name,
    });
    const refresh_token = createRefreshToken({
      id: checkUser.id,
      role: checkUser.userRoles[0].role.name,
    });
    res.cookie("REFRESH_TOKEN", refresh_token, {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return {
      status: 201,
      data: {
        data: { user: other, access_token: access_token },
        message: "ok",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: { message: "lỗi rồi" },
    };
  }
};

const createAccessToken = (obj: any) => {
  const access_token = jwt.sign(obj, process.env.AT || "super-serect", {
    expiresIn: "3h",
  });
  return access_token;
};

const createRefreshToken = (obj: any) => {
  const refresh_token = jwt.sign(obj, process.env.RF || "super-serect", {
    expiresIn: "24h",
  });
  return refresh_token;
};
