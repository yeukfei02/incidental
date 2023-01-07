import { UserRole, IncidentType, Status } from '@prisma/client';

export class GetIncidentsDto {
  userRole: UserRole;
  userId: string;
  searchText?: string;
  incidentType?: IncidentType;
  status?: Status;
  page?: number;
  perPage?: number;
  sortByCreatedAt?: boolean;
  sortByUpdatedAt?: boolean;
}
