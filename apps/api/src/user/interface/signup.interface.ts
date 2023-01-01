import { UserRole } from '@prisma/client';

export interface SignupRes {
  message: string;
  user: UserRes;
}

export interface UserRes {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: UserRole[];
}
