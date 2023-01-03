export interface IncidentRes {
  id: string;
  title: string;
  description: string;
  type: string;
  creator_id: string;
  assignee_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  creator: Creator;
  assignee: Assignee;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: string[];
}

export interface Assignee {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  userRoles: string[];
}
