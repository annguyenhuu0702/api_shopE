export interface User {
  id: number;
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
  city: string;
  ward: string;
  district: string;
  street: string;
  avatar: string;
  phone: string;
  gender: boolean;
}
