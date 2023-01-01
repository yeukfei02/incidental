import { Injectable } from '@nestjs/common';
import { IncidentType, UserRole } from '@prisma/client';
import { IncidentRepository } from './incident.repository';

@Injectable()
export class IncidentService {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async createIncident(
    title: string,
    description: string,
    type: IncidentType,
    creator_id: string,
    userRole: UserRole
  ) {
    const incident = await this.incidentRepository.createIncident(
      title,
      description,
      type,
      creator_id,
      userRole
    );
    return incident;
  }

  async getIncidents(userRole: UserRole, userId: string) {
    const incidents = await this.incidentRepository.getIncidents(
      userRole,
      userId
    );
    return incidents;
  }
}
