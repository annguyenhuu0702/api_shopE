export interface role {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userRoles: [];
  isDeleted: boolean;
}
