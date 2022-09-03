import { queryItems } from "./common";

export interface createCategoryType {
  name: string;
}

export interface updateCategoryType extends createCategoryType {}

export interface getAllCategoryType extends queryItems {
  name?: string;
}
