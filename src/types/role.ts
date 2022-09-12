import { User } from "./user";

export interface role {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isDeleted: boolean;
  users: User[];
}
