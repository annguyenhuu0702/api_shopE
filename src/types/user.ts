import { queryItems } from "./common";
import { role } from "./role";

export interface User {
  id?: number | string;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  email: string;
  hash?: string;
  city: string;
  ward: string;
  district: string;
  street: string;
  birthday: Date;
  avatar: string;
  phone: string;
  isDeleted: boolean;
  gender: boolean;
  role?: role;

  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
}

export interface userDto {
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  phone: string;
  ward: string;
  gender: boolean;
}

export interface getAllUser extends queryItems {
  email?: string;
  fullname?: string;
  phone?: string;
}
