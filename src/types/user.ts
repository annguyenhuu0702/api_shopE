export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  email: string;
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
