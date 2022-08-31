import { QueryItems } from "./common";

// export interface category {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   title: string;
//   name: string;
//   description: string;
//   slug: string;
//   thumbnail: string;
//   categoryTypeId: number | null;
//   categoryType?: any;
//   parentId?: number | null;
//   parent?: any;
//   children?: any;
//   productCategories?: any;
// }

export interface createCategory {
  thumbnail?: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  categoryTypeId: number;
  parentId?: number | null;
}

export interface updateCategory extends createCategory {}

export interface getAllCategory extends QueryItems {}
