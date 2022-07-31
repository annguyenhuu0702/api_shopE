import * as argon from "argon2";
import {
  QueryItems,
  ResponseErrorType,
  ResponseType,
  ResponseTypePagination,
} from "../types/common";
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
        status: 200,
        data: { data: other, message: "Ok" },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  },
  getAll: async (
    query: QueryItems
  ): Promise<ResponseTypePagination<User> | ResponseErrorType> => {
    const { p, limit } = query;
    try {
      const users: User[] = await db.user.findMany({
        where: {
          userRoles: {
            every: {
              role: {
                name: "user",
              },
            },
          },
        },
        take: limit ? parseInt(limit) : 7,
        skip: limit && p ? (parseInt(p) - 1) * parseInt(limit) : 0,
        orderBy: {
          createdAt: "desc",
        },
      });
      const newData = users.map((item) => {
        const { hash, ...others } = item;
        return others;
      });

      const count = await db.user.count({
        where: {
          userRoles: {
            every: {
              role: {
                name: "user",
              },
            },
          },
        },
      });

      return {
        status: 200,
        data: {
          data: {
            rows: newData,
            count,
          },
          message: "ok",
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
  },
};
