import { IncidentType, UserRole } from '@prisma/client';

export class CreateIncidentDto {
  title: string;
  description: string;
  type: IncidentType;
  creator_id: string;
  userRole: UserRole;
}
