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
  user: User;
  accessToken: string;
}

export interface changeProfileDto {
  fullname: string;
  birthday: Date;
  gender: boolean;
}

export interface changePasswordDto {
  currentpassword: string;
  newpassword: string;
}

export interface changeEmailDto {
  email: string;
}
