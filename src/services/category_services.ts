import { categoryDto, category } from "../types/category";
import { ResponseMessage, ResponseType } from "../types/common";
import { db } from "../utils/db.server";

export const category_service = {
  create: async (
    body: categoryDto
  ): Promise<ResponseType<category> | ResponseMessage> => {
    try {
      const data = await db.category.create({
        data: body,
        include: {
          parent: true,
        },
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
};
