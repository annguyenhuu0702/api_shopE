import { categoryDto, typeCategory } from "../types/category";
import { ResponseErrorType, ResponseType } from "../types/common";
import { db } from "../utils/db.server";

export const category_service = {
  create: async (
    body: categoryDto
  ): Promise<ResponseType<typeCategory> | ResponseErrorType> => {
    try {
      const data: typeCategory & {
        parent: typeCategory | null;
      } = await db.category.create({
        data: body,
        include: {
          parent: true,
        },
      });
      return {
        status: 201,
        data: { data: data, message: "ok" },
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: "error" },
      };
    }
  },
};
