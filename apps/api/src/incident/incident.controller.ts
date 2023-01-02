import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { IncidentService } from './incident.service';
import { CreateIncidentRes } from './interface/createIncident.interface';
import { GetIncidentsRes } from './interface/getIncidents.interface';
import { GetIncidentByIdRes } from './interface/getIncidentById.interface';
import { DeleteIncidentByIdRes } from './interface/deleteIncidentById.interface';
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
    const creatorId = createIncidentDto.creatorId;
    const userRole = createIncidentDto.userRole;

    const incident = await this.incidentService.createIncident(
      title,
      description,
      type,
      creatorId,
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
    @Query('userId') userId: string,
    @Query('searchText') searchText?: string
  ) {
    let response: GetIncidentsRes;

    const incidents = await this.incidentService.getIncidents(
      userRole,
      userId,
      searchText
    );
    if (incidents) {
      response = {
        message: 'get incidents',
        incidents: incidents,
      };
    }

    return response;
  }

  @Get('/:id')
  async getIncidentById(@Param('id') id: string) {
    let response: GetIncidentByIdRes;

    const incident = await this.incidentService.getIncidentById(id);
    if (incident) {
      response = {
        message: 'get incident',
        incident: incident,
      };
    }

    return response;
  }

  @Delete('/:id')
  async deleteIncidentById(@Param('id') id: string) {
    let response: DeleteIncidentByIdRes;

    const incident = await this.incidentService.deleteIncidentById(id);
    if (incident) {
      response = {
        message: 'delete incident by id',
        incident: incident,
      };
    }

    return response;
  }
}
