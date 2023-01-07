import { Injectable } from '@nestjs/common';
import { Incident, UserRole, Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { AssignIncidentStatusDto } from './dto/assignIncidentStatus.dto';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { GetIncidentsDto } from './dto/getIncidents.dto';
import { UpdateIncidentByIdDto } from './dto/updateIncidentById.dto';
import { UpdateIncidentStatusDto } from './dto/updateIncidentStatus.dto';

@Injectable()
export class IncidentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createIncident(createIncidentDto: CreateIncidentDto) {
    let incident: Incident;

    const title = createIncidentDto.title;
    const description = createIncidentDto.description;
    const type = createIncidentDto.type;
    const creatorId = createIncidentDto.creatorId;
    const userRole = createIncidentDto.userRole;

    if (userRole === UserRole.ADMIN) {
      incident = await this.prisma.incident.create({
        data: {
          title: title,
          description: description,
          type: type,
          incidentRef: `I${uuidv4().substring(0, 8).toUpperCase()}`,
          creator_id: creatorId,
        },
      });
    }

    return incident;
  }

  async findIncidents(getIncidentsDto: GetIncidentsDto) {
    const userRole = getIncidentsDto.userRole;
    const userId = getIncidentsDto.userId;
    const searchText = getIncidentsDto.searchText;
    const incidentType = getIncidentsDto.incidentType;
    const status = getIncidentsDto.status;
    const page = getIncidentsDto.page ? getIncidentsDto.page : 1;
    const perPage = getIncidentsDto.perPage ? getIncidentsDto.perPage : 10;
    const sortByCreatedAt = getIncidentsDto.sortByCreatedAt ? 'true' : 'false';
    const sortByUpdatedAt = getIncidentsDto.sortByUpdatedAt ? 'true' : 'false';

    const pageInt = page ? page : 1;
    const perPageInt = perPage ? perPage : 10;

    const orderBy: unknown[] = [
      ...(sortByCreatedAt
        ? [
            {
              created_at: sortByCreatedAt === 'true' ? 'asc' : 'desc',
            },
          ]
        : [
            {
              created_at: 'desc',
            },
          ]),
      ...(sortByUpdatedAt
        ? [
            {
              updated_at: sortByUpdatedAt === 'true' ? 'asc' : 'desc',
            },
          ]
        : [
            {
              updated_at: 'desc',
            },
          ]),
    ];
    console.log('orderBy = ', orderBy);

    const incidents = await this.prisma.incident.findMany({
      where: {
        ...(userRole === UserRole.ADMIN && {
          creator_id: userId,
        }),
        ...(userRole === UserRole.NORMAL_USER && {
          assignee_id: userId,
        }),
        ...(searchText && {
          OR: [
            {
              title: {
                contains: searchText,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchText,
                mode: 'insensitive',
              },
            },
            {
              incidentRef: {
                contains: searchText,
                mode: 'insensitive',
              },
            },
          ],
        }),
        ...(incidentType && {
          type: {
            in: [incidentType],
          },
        }),
        ...(status && {
          status: {
            in: [status],
          },
        }),
      },
      orderBy: orderBy,
      skip: pageInt > 1 ? pageInt * perPageInt - perPageInt : 0,
      take: perPageInt,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });

    return incidents;
  }

  async findAllIncidentsByUserRoleAndUserId(
    userRole: UserRole,
    userId: string
  ) {
    const allIncidents = await this.prisma.incident.findMany({
      where: {
        ...(userRole === UserRole.ADMIN && {
          creator_id: userId,
        }),
        ...(userRole === UserRole.NORMAL_USER && {
          assignee_id: userId,
        }),
      },
    });
    return allIncidents;
  }

  async findIncidentById(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async assignIncident(
    id: string,
    assignIncidentStatusDto: AssignIncidentStatusDto
  ) {
    const assigneeId = assignIncidentStatusDto.assigneeId;

    const incident = await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: {
        assignee_id: assigneeId,
        status: Status.ASSIGNED,
        updated_at: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async updateIncidentStatus(
    id: string,
    updateIncidentStatusDto: UpdateIncidentStatusDto
  ) {
    const status = updateIncidentStatusDto.status;

    const incident = await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        updated_at: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async updateIncidentById(
    id: string,
    updateIncidentByIdDto: UpdateIncidentByIdDto
  ) {
    const title = updateIncidentByIdDto.title;
    const description = updateIncidentByIdDto.description;
    const incidentType = updateIncidentByIdDto.incidentType;

    const incident = await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        type: incidentType,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async deleteIncidentById(id: string) {
    const incident = await this.prisma.incident.delete({
      where: {
        id: id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }
}
