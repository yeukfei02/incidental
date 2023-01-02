import { Incident } from '@prisma/client';

export interface AssignIncidentRes {
  message: string;
  incident: Incident;
}
