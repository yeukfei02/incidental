import { Incident } from '@prisma/client';

export interface GetIncidentsRes {
  message: string;
  incidents: Incident[];
  total: number;
  page: number;
  perPage: number;
  totalPageCount: number;
}
