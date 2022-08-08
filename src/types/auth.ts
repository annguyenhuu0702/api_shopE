import { User } from "./user";

export interface registerDto {
  email: string;
  password: string;
  fullname: string;
}

export interface loginDto {
  email: string;
  password: string;
}

export interface typeAuth {
  user: User | undefined;
  accessToken: string;
}

export interface changeProfileDto {
  fullname: string;
  birthday: Date;
  gender: boolean;
}
