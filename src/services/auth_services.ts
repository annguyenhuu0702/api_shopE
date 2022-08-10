import * as argon from "argon2";
import * as dotenv from "dotenv";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
  typeAuth,
} from "../types/auth";
import { ResponseMessage, ResponseType } from "../types/common";
import { User } from "../types/user";
import { db } from "../utils/db.server";

dotenv.config();

const createAccessToken = (obj: any) => {
  const accessToken = jwt.sign(obj, process.env.AT || "super-serect", {
    expiresIn: "3h",
  });
  return accessToken;
};

const createRefreshToken = (obj: any) => {
  const refresh_token = jwt.sign(obj, process.env.RF || "super-serect", {
    expiresIn: "24h",
  });
  return refresh_token;
};

export const register = async (
  body: registerDto,
  res: Response
): Promise<ResponseType<typeAuth> | ResponseMessage> => {
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
    const { hash: _hash, ...others } = user;
    const accessToken = createAccessToken({
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
        data: { user: others, accessToken: accessToken },
        message: "Success",
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
): Promise<ResponseType<typeAuth> | ResponseMessage> => {
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
    const { hash: _hash, ...others } = checkUser;
    const accessToken = createAccessToken({
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
        data: { user: others, accessToken: accessToken },
        message: "Success",
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

export const refreshToken = async (
  req: Request
): Promise<ResponseType<{ accessToken: string }> | ResponseMessage> => {
  try {
    if (!req.cookies) {
      return {
        status: 401,
        data: {
          message: "Login now",
        },
      };
    }
    const refreshToken = req.cookies["REFRESH_TOKEN"];
    if (!refreshToken) {
      return {
        status: 401,
        data: {
          message: "Login now",
        },
      };
    }

    const decoded: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "super-secret-1",
      {
        ignoreExpiration: true,
      }
    );

    const accessToken = jwt.sign(
      { id: decoded.id, userRoles: decoded.userRoles },
      process.env.ACCESS_TOKEN_SECRET || "super-secret",
      {
        expiresIn: 3 * 60 * 60 * 1000,
      }
    );

    return {
      status: 201,
      data: {
        data: {
          accessToken,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: { message: "Something is wrong" },
    };
  }
};

export const getProfile = async (
  user: any
): Promise<ResponseType<User> | ResponseMessage> => {
  try {
    const data = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (data) {
      const { hash, ...others } = data;
      return {
        status: 200,
        data: {
          data: others,
          message: "Success",
        },
      };
    } else {
      return {
        status: 200,
        data: {
          data: null,
          message: "Success",
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: "Error!",
      },
    };
  }
};

export const changeProfile = async (
  body: changeProfileDto,
  user: any
): Promise<ResponseMessage> => {
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...body,
      },
    });
    return {
      status: 200,
      data: {
        message: "Change profile successfully!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: "Error",
      },
    };
  }
};

export const changePassword = async (
  body: changePasswordDto,
  user: any
): Promise<ResponseMessage> => {
  try {
    const data = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (data) {
      const checkPassword = await argon.verify(data.hash, body.currentpassword);
      if (checkPassword) {
        const hash = await argon.hash(body.newpassword);
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            hash: hash,
          },
        });
        return {
          status: 200,
          data: {
            message: "Change password successfully!",
          },
        };
      }
    }
    return {
      status: 400,
      data: {
        message: "Error!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: "Error",
      },
    };
  }
};

export const changeEmail = async (
  body: changeEmailDto,
  user: any
): Promise<ResponseMessage> => {
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...body,
      },
    });
    return {
      status: 200,
      data: {
        message: "Change email successfully!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: "Error",
      },
    };
  }
};
