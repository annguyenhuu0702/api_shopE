import { queryItems } from "./common";

export interface createCategory {
  thumbnail?: string;
  slug: string;
  title: string;
  name: string;
  categoryTypeId: number | null;
  parentId: number | null;
}

export interface updateCategory extends createCategory {}

export interface getAllCategory extends queryItems {
  name?: string;
  categoryType?: string;
  parent?: string;
}
