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
import { UpdateIncidentStatusDto } from './dto/updateIncidentStatus.dto';
import { AssignIncidentStatusDto } from './dto/assignIncidentStatus.dto';
import { IncidentService } from './incident.service';
import { CreateIncidentRes } from './interface/createIncident.interface';
import { GetIncidentsRes } from './interface/getIncidents.interface';
import { GetIncidentByIdRes } from './interface/getIncidentById.interface';
import { DeleteIncidentByIdRes } from './interface/deleteIncidentById.interface';
import { UpdateIncidentStatusRes } from './interface/updateIncidentStatus.interface';
import { AssignIncidentRes } from './interface/assignIncident.interface';
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
    @Query('searchText') searchText?: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string
  ): Promise<GetIncidentsRes> {
    let response: GetIncidentsRes;

    const incidents = await this.incidentService.getIncidents(
      userRole,
      userId,
      searchText,
      page,
      perPage
    );
    const allIncidents = await this.incidentService.getAllIncidents();

    const pageInt = page ? parseInt(page, 10) : 1;
    const perPageInt = perPage ? parseInt(perPage, 10) : 10;

    if (incidents) {
      response = {
        message: 'get incidents',
        incidents: incidents,
        total: incidents.length,
        page: pageInt,
        perPage: perPageInt,
        totalPageCount: allIncidents
          ? Math.floor(allIncidents.length / perPageInt)
          : 0,
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
