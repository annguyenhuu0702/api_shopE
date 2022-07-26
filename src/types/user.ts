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
  avatar: string;
  phone: string;
  isDeleted: boolean;
  gender: boolean;
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
  // userRoles
}

export interface UserDto {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
}
