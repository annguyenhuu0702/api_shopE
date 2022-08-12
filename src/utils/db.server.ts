import { PrismaClient } from "@prisma/client";
let db: PrismaClient;

const prisma = new PrismaClient({});

const setDeleted = async (modelName: string) => {
  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == modelName) {
      if (params.action == "delete") {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args["data"] = { isDeleted: true };
      }
      if (params.action == "deleteMany") {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data != undefined) {
          params.args.data["isDeleted"] = true;
        } else {
          params.args["data"] = { isDeleted: true };
        }
      }
    }
    return next(params);
  });
};

export const main = async () => {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/
  await setDeleted("User");
};

declare global {
  var db: PrismaClient | undefined;
}

if (!global.db) {
  main();
  global.db = prisma;
}

db = global.db;

export { db };
