import { UserRole } from '@prisma/client';

export class GetIncidentsDto {
  userRole: UserRole;
  userId: string;
  searchText?: string;
  incidentType?: string[];
  status?: string[];
  page?: number;
  perPage?: number;
  sortByCreatedAt?: boolean;
  sortByUpdatedAt?: boolean;
}
