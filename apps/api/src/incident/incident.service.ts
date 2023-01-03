import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AssignIncidentStatusDto } from './dto/assignIncidentStatus.dto';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { GetIncidentsDto } from './dto/getIncidents.dto';
import { UpdateIncidentByIdDto } from './dto/updateIncidentById.dto';
import { UpdateIncidentStatusDto } from './dto/updateIncidentStatus.dto';
import { IncidentRepository } from './incident.repository';

@Injectable()
export class IncidentService {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async createIncident(createIncidentDto: CreateIncidentDto) {
    const incident = await this.incidentRepository.createIncident(
      createIncidentDto
    );
    return incident;
  }

  async getIncidents(getIncidentsDto: GetIncidentsDto) {
    const incidents = await this.incidentRepository.findIncidents(
      getIncidentsDto
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

  async assignIncident(
    id: string,
    assignIncidentStatusDto: AssignIncidentStatusDto
  ) {
    const incident = await this.incidentRepository.assignIncident(
      id,
      assignIncidentStatusDto
    );
    return incident;
  }

  async updateIncidentStatus(
    id: string,
    updateIncidentStatusDto: UpdateIncidentStatusDto
  ) {
    const incident = await this.incidentRepository.updateIncidentStatus(
      id,
      updateIncidentStatusDto
    );
    return incident;
  }

  async updateIncidentById(
    id: string,
    updateIncidentByIdDto: UpdateIncidentByIdDto
  ) {
    const incident = await this.incidentRepository.updateIncidentById(
      id,
      updateIncidentByIdDto
    );
    return incident;
  }

  async deleteIncidentById(id: string) {
    const incident = await this.incidentRepository.deleteIncidentById(id);
    return incident;
  }
}
