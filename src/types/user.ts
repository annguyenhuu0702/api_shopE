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
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
  // userRoles
}

export interface UserDto {
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  phone: string;
  ward: string;
  gender: boolean;
}
