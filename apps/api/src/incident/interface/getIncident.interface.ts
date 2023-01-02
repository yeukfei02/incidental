import { Incident } from '@prisma/client';

export interface GetIncidentRes {
  message: string;
  incident: Incident;
}
