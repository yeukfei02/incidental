import { UserRole, IncidentType } from '@prisma/client';

export class GetIncidentsDto {
  userRole: UserRole;
  userId: string;
  searchText?: string;
  incidentType?: IncidentType;
  page?: number;
  perPage?: number;
  sortByCreatedAt?: boolean;
  sortByUpdatedAt?: boolean;
}
