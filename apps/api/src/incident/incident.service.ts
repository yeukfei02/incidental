import { Injectable } from '@nestjs/common';
import { IncidentType, UserRole, Status } from '@prisma/client';
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

  async getIncidents(
    userRole: UserRole,
    userId: string,
    searchText?: string,
    incidentType?: IncidentType,
    page?: number,
    perPage?: number,
    sortByCreatedAt?: string,
    sortByUpdatedAt?: string
  ) {
    const incidents = await this.incidentRepository.findIncidents(
      userRole,
      userId,
      searchText,
      incidentType,
      page,
      perPage,
      sortByCreatedAt,
      sortByUpdatedAt
    );
    return incidents;
  }

  async getAllIncidentsByUserRoleAndUserId(userRole: UserRole, userId: string) {
    const allIncidents =
      await this.incidentRepository.findAllIncidentsByUserRoleAndUserId(
        userRole,
        userId
      );
    return allIncidents;
  }

  async getIncidentById(id: string) {
    const incident = await this.incidentRepository.findIncidentById(id);
    return incident;
  }

  async assignIncident(id: string, assigneeId: string) {
    const incident = await this.incidentRepository.assignIncident(
      id,
      assigneeId
    );
    return incident;
  }

  async updateIncidentStatus(id: string, status: Status) {
    const incident = await this.incidentRepository.updateIncidentStatus(
      id,
      status
    );
    return incident;
  }

  async updateIncidentById(
    id: string,
    title: string,
    description: string,
    incidentType: IncidentType,
    status: Status
  ) {
    const incident = await this.incidentRepository.updateIncidentById(
      id,
      title,
      description,
      incidentType,
      status
    );
    return incident;
  }

  async deleteIncidentById(id: string) {
    const incident = await this.incidentRepository.deleteIncidentById(id);
    return incident;
  }
}
