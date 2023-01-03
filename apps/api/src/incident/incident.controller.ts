import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { GetIncidentsDto } from './dto/getIncidents.dto';
import { UpdateIncidentStatusDto } from './dto/updateIncidentStatus.dto';
import { AssignIncidentStatusDto } from './dto/assignIncidentStatus.dto';
import { IncidentService } from './incident.service';
import { CreateIncidentRes } from './interface/createIncident.interface';
import { GetIncidentsRes } from './interface/getIncidents.interface';
import { GetIncidentByIdRes } from './interface/getIncidentById.interface';
import { DeleteIncidentByIdRes } from './interface/deleteIncidentById.interface';
import { UpdateIncidentStatusRes } from './interface/updateIncidentStatus.interface';
import { AssignIncidentRes } from './interface/assignIncident.interface';
import { UserRole, IncidentType } from '@prisma/client';

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

  @Post('/list')
  async getIncidents(
    @Body() getIncidentsDto: GetIncidentsDto
  ): Promise<GetIncidentsRes> {
    let response: GetIncidentsRes;

    const userRole = getIncidentsDto.userRole;
    const userId = getIncidentsDto.userId;
    const searchText = getIncidentsDto.searchText;
    const incidentType = getIncidentsDto.incidentType;
    const page = getIncidentsDto.page ? getIncidentsDto.page : 1;
    const perPage = getIncidentsDto.perPage
      ? getIncidentsDto.perPage
      : 10;
    const sortByCreatedAt = getIncidentsDto.sortByCreatedAt ? 'true' : 'false';
    const sortByUpdatedAt = getIncidentsDto.sortByUpdatedAt ? 'true' : 'false';

    const incidents = await this.incidentService.getIncidents(
      userRole,
      userId,
      searchText,
      incidentType,
      page,
      perPage,
      sortByCreatedAt,
      sortByUpdatedAt
    );
    const allIncidents =
      await this.incidentService.getAllIncidentsByUserRoleAndUserId(
        userRole,
        userId
      );
    console.log('allIncidents.length = ', allIncidents.length);

    if (incidents) {
      response = {
        message: 'get incidents',
        incidents: incidents,
        total: incidents.length,
        page: page,
        perPage: perPage,
        totalPageCount:
          allIncidents && allIncidents.length > 0
            ? Math.floor(allIncidents.length / perPage) || 1
            : 1,
      };
    }

    return response;
  }

  @Get('/:id')
  async getIncidentById(@Param('id') id: string): Promise<GetIncidentByIdRes> {
    let response: GetIncidentByIdRes;

    const incident = await this.incidentService.getIncidentById(id);
    if (incident) {
      response = {
        message: 'get incident by id',
        incident: incident,
      };
    }

    return response;
  }

  @Patch('/:id/assignIncident')
  async assignIncident(
    @Param('id') id: string,
    @Body() assignIncidentStatusDto: AssignIncidentStatusDto
  ): Promise<AssignIncidentRes> {
    let response: AssignIncidentRes;

    const assigneeId = assignIncidentStatusDto.assigneeId;

    const incident = await this.incidentService.assignIncident(id, assigneeId);
    if (incident) {
      response = {
        message: 'update incident status',
        incident: incident,
      };
    }

    return response;
  }

  @Patch('/:id/updateIncidentStatus')
  async updateIncidentStatus(
    @Param('id') id: string,
    @Body() updateIncidentStatusDto: UpdateIncidentStatusDto
  ): Promise<UpdateIncidentStatusRes> {
    let response: UpdateIncidentStatusRes;

    const status = updateIncidentStatusDto.status;

    const incident = await this.incidentService.updateIncidentStatus(
      id,
      status
    );
    if (incident) {
      response = {
        message: 'update incident status',
        incident: incident,
      };
    }

    return response;
  }

  @Delete('/:id')
  async deleteIncidentById(
    @Param('id') id: string
  ): Promise<DeleteIncidentByIdRes> {
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
