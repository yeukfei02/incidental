import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { IncidentService } from './incident.service';
import { CreateIncidentRes } from './interface/createIncident.interface';
import { GetIncidentsRes } from './interface/getIncidents.interface';
import { UserRole } from '@prisma/client';

@Controller('incidents')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post('/create')
  async createIncident(
    @Body() createIncidentDto: CreateIncidentDto
  ): Promise<CreateIncidentRes> {
    let response: CreateIncidentRes;

    const title = createIncidentDto.title;
    const description = createIncidentDto.description;
    const type = createIncidentDto.type;
    const creator_id = createIncidentDto.creator_id;
    const userRole = createIncidentDto.userRole;

    const incident = await this.incidentService.createIncident(
      title,
      description,
      type,
      creator_id,
      userRole
    );
    if (incident) {
      response = {
        message: 'create incident',
        incident: incident,
      };
    }

    return response;
  }

  @Get('/list')
  async getIncidents(
    @Query('userRole') userRole: UserRole,
    @Query('userId') userId: string
  ) {
    let response: GetIncidentsRes;

    const incidents = await this.incidentService.getIncidents(userRole, userId);
    if (incidents) {
      response = {
        message: 'get incidents',
        incidents: incidents,
      };
    }

    return response;
  }
}
