import { UserRole } from '@prisma/client';

export interface LoginRes {
  message: string;
  token: string;
  user: UserRes;
}

export interface UserRes {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: UserRole[];
}
