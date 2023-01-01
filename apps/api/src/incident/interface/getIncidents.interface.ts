import { Incident } from '@prisma/client';

export interface GetIncidentsRes {
  message: string;
  incidents: Incident[];
}
