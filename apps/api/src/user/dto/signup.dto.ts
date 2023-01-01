import { UserRole } from '@prisma/client';

export class SignupDto {
  email: string;
  password: string;
  userRoles: UserRole[];
}
