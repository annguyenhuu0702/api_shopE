import * as argon from "argon2";
import { ResponseErrorType, ResponseType } from "../types/common";
import { User, UserDto } from "../types/user";
import { db } from "../utils/db.server";

export const user_services = {
  create: async (
    body: UserDto
  ): Promise<ResponseType<User> | ResponseErrorType> => {
    try {
      const { email, password, ...others } = body;
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
          ...others,
          hash,
          email,
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
      return {
        status: 500,
        data: { data: other, message: "Ok" },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "lỗi" },
      };
    }
  },
};
