import { IncidentType } from '@prisma/client';

export class UpdateIncidentByIdDto {
  title: string;
  description: string;
  incidentType: IncidentType;
}
