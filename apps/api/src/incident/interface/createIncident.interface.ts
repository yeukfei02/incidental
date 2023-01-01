import { Incident } from '@prisma/client';

export interface CreateIncidentRes {
  message: string;
  incident: Incident;
}
