import { Incident } from '@prisma/client';

export interface GetIncidentByIdRes {
  message: string;
  incident: Incident;
}
