import { prisma } from "@prisma/client";
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
      const { email, password, ...other } = body;
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
          ...other,
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
      const { hash: _hash, ...others } = user;
      return {
        status: 200,
        data: { data: others, message: "Ok" },
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
  ): Promise<ResponseTypePagination<User[]> | ResponseErrorType> => {
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
  update: async (
    body: UserDto,
    id: string
  ): Promise<ResponseType<User> | ResponseErrorType> => {
    try {
      const updateUser = await db.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...body,
        },
      });
      return {
        status: 200,
        data: {
          data: updateUser,
          message: "Update successfully!",
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
  getById: async (id: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (user !== null) {
        const { hash, ...others } = user;
        return {
          status: 200,
          data: {
            data: others,
            message: "Ok",
          },
        };
      } else {
        return {
          status: 200,
          data: {
            data: user,
            message: "Ok",
          },
        };
      }
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
