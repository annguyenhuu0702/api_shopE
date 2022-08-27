import { CategoryType } from "@prisma/client";
import { createCategoryType, updateCategoryType } from "../types/categoryType";
import {
  ResponseMessage,
  ResponseType,
  ResponseTypePagination,
} from "../types/common";
import { getAllCategoryTypeDto } from "../types/categoryType";
import { db } from "../utils/db.server";

export const categoryType_service = {
  getAll: async (
    query: getAllCategoryTypeDto
  ): Promise<ResponseTypePagination<CategoryType[]> | ResponseMessage> => {
    const { p, limit, name } = query;
    try {
      const data = await db.categoryType.findMany({
        where: {
          isDeleted: false,
          ...(name
            ? {
                name: {
                  contains: name,
                  mode: "insensitive",
                },
              }
            : {}),
        },
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        orderBy: {
          createdAt: "desc",
        },
      });

      const count = await db.categoryType.count({
        where: {
          isDeleted: false,
        },
      });
      return {
        status: 200,
        data: {
          data: {
            rows: data,
            count,
          },
          message: "Success",
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
  create: async (
    body: createCategoryType
  ): Promise<ResponseType<CategoryType> | ResponseMessage> => {
    try {
      const data = await db.categoryType.create({
        data: body,
      });
      return {
        status: 201,
        data: { data: data, message: "Success" },
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: "error" },
      };
    }
  },
  update: async (
    body: updateCategoryType,
    id: string
  ): Promise<ResponseType<CategoryType> | ResponseMessage> => {
    try {
      const data = await db.categoryType.update({
        where: {
          id: parseInt(id),
        },
        data: { ...body },
      });
      return {
        status: 200,
        data: { data: data, message: "Update success" },
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: "error" },
      };
    }
  },
  delete: async (id: string): Promise<ResponseMessage> => {
    try {
      await db.categoryType.delete({
        where: {
          id: parseInt(id),
        },
      });
      return {
        status: 200,
        data: {
          message: "Delete successfully!",
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