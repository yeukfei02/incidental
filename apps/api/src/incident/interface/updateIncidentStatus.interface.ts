import { Incident } from '@prisma/client';

export interface UpdateIncidentStatusRes {
  message: string;
  incident: Incident;
}
