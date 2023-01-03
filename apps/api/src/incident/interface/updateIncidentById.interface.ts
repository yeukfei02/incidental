import { Incident } from '@prisma/client';

export interface UpdateIncidentByIdRes {
  message: string;
  incident: Incident;
}
