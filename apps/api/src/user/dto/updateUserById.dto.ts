import { UserRole } from '@prisma/client';

export class UpdateUserByIdDto {
  name: string;
  email: string;
  userRole: UserRole;
}
