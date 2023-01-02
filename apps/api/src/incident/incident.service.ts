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
    creatorId: string,
    userRole: UserRole
  ) {
    const incident = await this.incidentRepository.createIncident(
      title,
      description,
      type,
      creatorId,
      userRole
    );
    return incident;
  }

  async getIncidents(userRole: UserRole, userId: string, searchText?: string) {
    const incidents = await this.incidentRepository.getIncidents(
      userRole,
      userId,
      searchText
    );
    return incidents;
  }

  async getIncidentById(id: string) {
    const incident = await this.incidentRepository.getIncident(id);
    return incident;
  }
}
