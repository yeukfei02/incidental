import { IncidentType, UserRole } from '@prisma/client';

export class CreateIncidentDto {
  title: string;
  description: string;
  type: IncidentType;
  creatorId: string;
  userRole: UserRole;
}
