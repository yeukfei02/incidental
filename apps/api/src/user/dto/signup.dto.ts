import { UserRole } from '@prisma/client';

export class SignupDto {
  name: string;
  email: string;
  password: string;
  userRoles: UserRole[];
}
