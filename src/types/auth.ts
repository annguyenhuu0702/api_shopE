import { User } from "./user"

export interface RegisterDto {
  email: string,
  password: string,
  fullname: string
}

export interface typeAuth {
  user : User | undefined,
  access_token: string
}