import { QueryItems } from "./common";

export interface createCategoryType {
  name: string;
}

export interface updateCategoryType extends createCategoryType {}

export interface getAllCategoryType extends QueryItems {
  name?: string;
}
