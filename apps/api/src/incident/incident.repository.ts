import { Injectable } from '@nestjs/common';
import { Incident, IncidentType, UserRole, Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IncidentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createIncident(
    title: string,
    description: string,
    type: IncidentType,
    creatorId: string,
    userRole: UserRole
  ) {
    let incident: Incident;

    if (userRole === UserRole.ADMIN) {
      incident = await this.prisma.incident.create({
        data: {
          title: title,
          description: description,
          type: type,
          creator_id: creatorId,
        },
      });
    }

    return incident;
  }

  async findIncidents(
    userRole: UserRole,
    userId: string,
    searchText?: string,
    incidentType?: IncidentType,
    page?: number,
    perPage?: number,
    sortByCreatedAt?: string,
    sortByUpdatedAt?: string
  ) {
    const pageInt = page ? page : 1;
    const perPageInt = perPage ? perPage : 10;

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
          ],
        }),
        ...(incidentType && {
          type: {
            in: [incidentType],
          },
        }),
      },
      orderBy: [
        {
          created_at:
            sortByCreatedAt && sortByCreatedAt === 'true'
              ? 'asc'
              : 'desc' || 'desc',
        },
        {
          updated_at:
            sortByUpdatedAt && sortByUpdatedAt === 'true'
              ? 'asc'
              : 'desc' || 'desc',
        },
      ],
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

  async assignIncident(id: string, assigneeId: string) {
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

  async updateIncidentStatus(id: string, status: Status) {
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
