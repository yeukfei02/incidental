import { Incident } from '@prisma/client';

export interface DeleteIncidentByIdRes {
  message: string;
  incident: Incident;
}
