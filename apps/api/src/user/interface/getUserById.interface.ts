import { UserRole } from '@prisma/client';

export interface GetUserByIdRes {
  message: string;
  user: UserRes;
}

export interface UserRes {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: UserRole[];
}
