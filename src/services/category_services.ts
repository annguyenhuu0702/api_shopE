import { Category } from "@prisma/client";
import { createCategory, updateCategory } from "../types/category";
import { getAllCategoryType } from "../types/categoryType";
import {
  ResponseMessage,
  ResponseType,
  ResponseTypePagination,
} from "../types/common";
import { db } from "../utils/db.server";
import { generateIncludeChildrenCategory } from "../utils/index";
export const category_service = {
  getAll: async (
    query: getAllCategoryType
  ): Promise<ResponseTypePagination<Category[]> | ResponseMessage> => {
    const { p, limit } = query;
    try {
      const data = await db.category.findMany({
        where: {
          isDeleted: false,
          categoryType: {
            isDeleted: false,
          },
        },
        include: {
          categoryType: true,
          ...generateIncludeChildrenCategory(
            query.depth ? parseInt(query.depth) : 1
          ),
        },
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        orderBy: {
          createdAt: "desc",
        },
      });

      const count = await db.category.count({
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
    body: createCategory
  ): Promise<ResponseType<Category> | ResponseMessage> => {
    try {
      const data = await db.category.create({
        data: body,
        include: {
          categoryType: true,
          ...generateIncludeChildrenCategory(1),
        },
      });
      return {
        status: 201,
        data: { data: data, message: "Success" },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "error" },
      };
    }
  },
  update: async (
    body: updateCategory,
    id: string
  ): Promise<ResponseType<Category> | ResponseMessage> => {
    try {
      const data = await db.category.update({
        where: {
          id: parseInt(id),
        },
        include: {
          categoryType: true,
          ...generateIncludeChildrenCategory(1),
        },
        data: { ...body },
      });
      return {
        status: 200,
        data: { data: data, message: "Update success" },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "error" },
      };
    }
  },
  delete: async (id: string): Promise<ResponseMessage> => {
    try {
      await db.category.delete({
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
