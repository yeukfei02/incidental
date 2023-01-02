import { UserRole, IncidentType, Status } from '@prisma/client';

export interface GetUserByIdRes {
  message: string;
  user: UserRes;
}

export interface UserRes {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: UserRole[];
  creatorIncidents: CreatorIncident[];
  assigneeIncidents: AssigneeIncident[];
}

export interface CreatorIncident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  creator_id: string;
  assignee_id: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface AssigneeIncident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  creator_id: string;
  assignee_id: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
